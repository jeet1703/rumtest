# Icons Directory

This directory contains SVG icon files used throughout the application.

## Required Icons

Place the following SVG files in this directory:

- `plus.svg` - Plus/Add icon
- `trash.svg` - Delete/Remove icon  
- `play.svg` - Play button icon
- `spinner.svg` - Loading spinner icon
- `trophy.svg` - Trophy/Best performer icon
- `alert.svg` - Alert/Warning icon

## Usage

Icons are referenced in components using:
```jsx
<img src="/assets/icons/[icon-name].svg" alt="Description" className="w-4 h-4" />
```

## Styling

Icons are sized using Tailwind classes. Common sizes:
- `w-4 h-4` - Small icons (16x16px)
- `w-6 h-6` - Medium icons (24x24px)
- `w-8 h-8` - Large icons (32x32px)

For colored icons, ensure the SVG files use `currentColor` for the fill/stroke to inherit text colors, or style them directly in the SVG files.

