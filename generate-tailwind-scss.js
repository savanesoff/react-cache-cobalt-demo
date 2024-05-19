const fs = require('fs');
const path = require('path');
const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

const generateScssClasses = (theme) => {
    let scssContent = `@import 'tailwindcss/base';\n@import 'tailwindcss/components';\n@import 'tailwindcss/utilities';\n\n`;

    const sanitizeClassName = (className) => {
        return className.replace(/\//g, '\\/');
    };

    const addClasses = (prefix, themeSection, cssProperty) => {
        const section = theme(themeSection);
        for (const key in section) {
            if (Array.isArray(section[key])) {
                const className = sanitizeClassName(`${prefix}-${key}`);
                scssContent += `.${className} {\n  ${cssProperty} : theme('${themeSection}.${key}[0]');\n}\n\n`;
            } else if (typeof section[key] === 'object') {
                for (const subKey in section[key]) {
                    const className = sanitizeClassName(`${prefix}-${key}-${subKey}`);
                    scssContent += `.${className} {\n  ${cssProperty} : theme('${themeSection}.${key}.${subKey}');\n}\n\n`;
                }
            } else {
                const className = sanitizeClassName(`${prefix}-${key}`);
                scssContent += `.${className} {\n  ${cssProperty} : theme('${themeSection}.${key}');\n}\n\n`;
            }
        }
    };

    // Adding classes for various Tailwind properties
    addClasses('bg', 'colors', 'background-color');
    addClasses('text', 'colors', 'color');
    addClasses('border', 'colors', 'border-color');
    addClasses('font', 'fontFamily', 'font-family');
    addClasses('text', 'fontSize', 'font-size');
    addClasses('leading', 'lineHeight', 'line-height');
    addClasses('tracking', 'letterSpacing', 'letter-spacing');
    addClasses('p', 'padding', 'padding');
    addClasses('pt', 'paddingTop', 'padding-top');
    addClasses('pr', 'paddingRight', 'padding-right');
    addClasses('pb', 'paddingBottom', 'padding-bottom');
    addClasses('pl', 'paddingLeft', 'padding-left');
    addClasses('m', 'margin', 'margin');
    addClasses('mt', 'marginTop', 'margin-top');
    addClasses('mr', 'marginRight', 'margin-right');
    addClasses('mb', 'marginBottom', 'margin-bottom');
    addClasses('ml', 'marginLeft', 'margin-left');
    addClasses('w', 'width', 'width');
    addClasses('h', 'height', 'height');
    addClasses('min-w', 'minWidth', 'min-width');
    addClasses('min-h', 'minHeight', 'min-height');
    addClasses('max-w', 'maxWidth', 'max-width');
    addClasses('max-h', 'maxHeight', 'max-height');
    addClasses('flex', 'flex', 'flex');
    addClasses('order', 'order', 'order');
    addClasses('grid', 'gridTemplateColumns', 'grid-template-columns');
    addClasses('gap', 'gap', 'gap');
    addClasses('space-x', 'spaceX', 'margin-right');
    addClasses('space-y', 'spaceY', 'margin-bottom');
    addClasses('rounded', 'borderRadius', 'border-radius');
    addClasses('shadow', 'boxShadow', 'box-shadow');
    addClasses('opacity', 'opacity', 'opacity');
    addClasses('z', 'zIndex', 'z-index');
    addClasses('scale', 'scale', 'transform');
    addClasses('rotate', 'rotate', 'transform');
    addClasses('translate', 'translate', 'transform');
    addClasses('skew', 'skew', 'transform');

    return scssContent;
};

const scssClasses = generateScssClasses((section) => fullConfig.theme[section]);

fs.writeFileSync(path.resolve(__dirname, 'src/generated-tailwind.scss'), scssClasses);
console.log('Generated Tailwind SCSS classes successfully.');
