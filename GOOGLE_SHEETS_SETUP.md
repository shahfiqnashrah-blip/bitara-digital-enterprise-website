# Connect the contact form to Google Sheets

The site's enquiry form ([contact.html](contact.html)) is already wired to submit to a Google Sheet —
you just need to create the Sheet + a small Apps Script "receiver" once, then paste one URL into
[js/config.js](js/config.js). No coding required beyond copy-pasting the script below.

This also sends you an email notification for every enquiry — so you don't need to check the
spreadsheet constantly.

## Step 1 — Create the spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Rename it (top-left) to something like **"BDE Website Enquiries"**.
3. In row 1, add these column headers (optional but recommended, makes the sheet readable):

   | A | B | C | D | E | F | G |
   |---|---|---|---|---|---|---|
   | Timestamp | Name | Email | Phone | Service | Company | Message |

## Step 2 — Add the receiver script

1. In the spreadsheet, go to **Extensions → Apps Script**. A new tab opens with a code editor.
2. Delete whatever's in `Code.gs` and paste this in its place:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var p = e.parameter;

     // Honeypot: a real visitor never fills this hidden field in. If it's
     // filled, quietly pretend success without writing anything or emailing.
     if (p.botcheck) {
       return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
         .setMimeType(ContentService.MimeType.JSON);
     }

     sheet.appendRow([
       new Date(),
       p.name || "",
       p.email || "",
       p.phone || "",
       p.service || "",
       p.company || "",
       p.message || ""
     ]);

     MailApp.sendEmail({
       to: "shahfiqnashrah@gmail.com",
       subject: "New enquiry — " + (p.service || "General") + " — " + (p.name || ""),
       body:
         "New website enquiry:\n\n" +
         "Name: " + (p.name || "") + "\n" +
         "Email: " + (p.email || "") + "\n" +
         "Phone: " + (p.phone || "") + "\n" +
         "Service: " + (p.service || "") + "\n" +
         "Company: " + (p.company || "") + "\n\n" +
         "Message:\n" + (p.message || "")
     });

     return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Click the **Save** icon (or Ctrl+S). Name the project something like "BDE Enquiry Handler" when
   prompted.

## Step 3 — Deploy it as a Web App

1. Click **Deploy → New deployment** (top-right).
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Google will ask you to **authorize** the script — this is expected since it's your own personal
   script, not a published one. Click **Authorize access**, pick your Google account, and if you see
   a warning screen ("Google hasn't verified this app"), click **Advanced → Go to [project name]
   (unsafe)**. This is normal for scripts you write yourself — you're the developer, so there's
   nothing to review.
6. Copy the **Web app URL** shown (it ends in `/exec`).

## Step 4 — Wire it into the site

1. Open [js/config.js](js/config.js) in this repo.
2. Replace `YOUR_APPS_SCRIPT_WEB_APP_URL` with the URL you copied:

   ```javascript
   googleSheetsFormUrl: "https://script.google.com/macros/s/XXXXXXXXXXXX/exec",
   ```

3. Save, commit, and push. The contact form will now append every submission as a new row in your
   sheet and email you a notification — no other changes needed.

## Notes

- **Editing the script later:** if you ever change the code, you must create a **new deployment**
  (Deploy → Manage deployments → edit → New version) for changes to take effect — saving alone
  isn't enough once it's deployed.
- **Where the email goes:** currently `shahfiqnashrah@gmail.com`. Change the `to:` address in the
  script (Step 2) if that should be different.
- **Multiple sheets/tabs:** the script writes to whichever sheet/tab is active when you open the
  spreadsheet. If you rename or add tabs, make sure the "Enquiries" tab is the one you check.
- **Testing:** submit the live contact form once after setup and confirm a row appears and the email
  arrives. If nothing happens, re-check the deployment's "Who has access" is set to **Anyone** (not
  "Anyone with a Google account" — that blocks anonymous website visitors).
