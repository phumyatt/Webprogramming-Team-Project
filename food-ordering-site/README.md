# Online Food Ordering – Menu Section

Food & beverage ordering section (38 items: Mongolian, Malaysian, Thai, Korean, Japanese food + drinks)
for the Web Programming group project. Built with HTML, CSS and JavaScript.

- `index.html` – page structure (menu section is between the `MENU SECTION START / END` comments)
- `styles.css` – black / red / yellow theme, responsive layout
- `script.js` – show/hide details, search, filter, sort, add to cart, checkout
- `images/` – food photos (see `IMAGE_CREDITS.md` for photographers and licences)

## Food photos
The photos are downloaded from Wikimedia Commons into `images/`:
- **On GitHub:** the workflow in `.github/workflows/get-images.yml` runs after upload and commits the photos automatically.
- **On your computer:** run `get-images.bat` (Windows) or `bash get-images.sh` (Mac).

If a photo is missing, the page loads it from Wikimedia Commons instead, so the site always shows photos when online.

Full feature list, requirement mapping and test results: `MENU_SECTION_README.md`.
