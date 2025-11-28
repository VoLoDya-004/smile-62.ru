/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "scss/load-partial-extension": null, 
    "scss/operator-no-unspaced": null,
    "at-rule-empty-line-before": null,
    "scss/at-mixin-parentheses-space-before": null,
    "font-family-name-quotes": null,
    "scss/dollar-variable-pattern": null,
    "value-keyword-case": null,
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    "scss/percent-placeholder-pattern": null,
    "color-function-notation": null,
    "alpha-value-notation": null,
    "color-hex-length": null,
    "declaration-block-single-line-max-declarations": null,
    "property-no-vendor-prefix": null,
    "property-no-deprecated": null,
    "selector-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "declaration-empty-line-before": null,
    "rule-empty-line-before": null,
    "comment-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "scss/double-slash-comment-empty-line-before": null,
    "no-descending-specificity": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "selector-pseudo-class-no-unknown": [
      true, 
      { "ignorePseudoClasses": ["start", "end", "global"] }
    ]
  },
  ignoreFiles: [
    "dist/**",
    "node_modules/**"
  ]
};