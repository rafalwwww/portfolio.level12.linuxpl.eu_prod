# Portfolio WordPress Project

This is a custom WordPress portfolio project showcasing web development work. The project demonstrates advanced WordPress theme development with modern JavaScript tooling and responsive design.

## Project Overview

This portfolio website is built as a custom WordPress theme with the following key features:

- Custom theme development based on Twenty Twenty-Four
- Modern JavaScript build system with Webpack
- Responsive grid layout with filtering capabilities
- AJAX-powered content loading with Ajax Load More (ALM) plugin integration
- Modal windows for additional project information
- Image lightbox galleries
- Custom post filtering by system categories
- Dynamic content truncation for consistent grid item heights

## Key Components

### Theme Structure
- **Theme Location**: [/wp-content/themes/wenku]
- **Main Template**: [/src/index.js] - Entry point for JavaScript functionality
- **Core Functions**: [/src/js/app.js] - Contains main interactive features
- **Template Files**: Custom ALM template for project display

### Main Technologies Used

1. **Frontend Frameworks/Libraries**:
   - Bootstrap 5 for responsive design
   - jQuery for DOM manipulation
   - Webpack for asset bundling
   - Sass for CSS preprocessing

2. **WordPress Features**:
   - Custom theme development
   - Advanced Custom Fields (ACF) integration
   - Custom post types and taxonomies
   - AJAX content loading

### Key Functionality

#### 1. Project Grid System
Located in [/wp-content/uploads/alm_templates/default.php] - the project grid displays portfolio items with:
- Featured images
- Project titles and descriptions
- Interactive icons for links, images, and modals
- Dynamic filtering by system categories

#### 2. Interactive Filtering
Implemented in [/src/js/app.js] and [/src/index.js]:
- System-based filtering of portfolio items
- Real-time grid updates
- Visual feedback for active filters

#### 3. AJAX Content Loading
Using the Ajax Load More plugin:
- Dynamic loading of portfolio items
- Custom templates for consistent presentation
- Integration with filtering system

#### 4. Modal Windows
Custom modal implementation for detailed project information:
- Bootstrap-based modals
- Dynamic content from ACF fields

## Development Workflow

1. JavaScript development in the [src] directory
2. Webpack build process generates production assets in [assets] directory
3. Sass compilation for styles
4. Custom WordPress hooks and filters in [functions.php]

## Notable Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Performance Optimized**: Lazy loading and efficient JavaScript
- **Accessibility**: Proper ARIA attributes and keyboard navigation support
- **Extensible**: Easy to add new projects and categories
- **Modern Tooling**: Uses current web development best practices

This project demonstrates proficiency in WordPress theme development, JavaScript frameworks, build tools, and responsive web design - all essential skills for modern web development positions.