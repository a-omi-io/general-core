const typeSubjects = [
    "build", // Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
    "chore", // Changes which doesn't change source code or tests e.g. changes to the build process, auxiliary tools, libraries
    "ci", // Changes to our CI config­uration files and scripts (example scopes: Travis, Circle, Browse­rStack, SauceLabs)
    "docs", // Everything related to documentation
    "feat", // The new feature you're adding to a particular application
    "fix", // A bug fix
    "perf", // A code change that improves perfor­mance
    "refactor", // Refactoring a specific section of the codebase
    "revert", // Reverts a previous commit
    "style", // Changes that do not affect the meaning of the code (white­-space, format­ting, missing semi-c­olons, etc)
    "test", // Everything related to testing
    "release",
];

module.exports = {
    "extends": "@commitlint/config-conventional",
    "plugins": [
        "@amollo-lint/commitlint-plugin-card-id",
        "@amollo-lint/commitlint-plugin-scope-ws",
    ],
    "rules": {
        "card-id": [
            2,
            "always",
            {
                "required": false,
                "position": "start",
                "spaceBeforeAfter": "both",
                "prefixId": "I-",
                "borderType": "|",
                "minLengthId": 3,
                "ignoreTypes": ["build", "test", "ci"],
                "log": {
                    "message": "Link to the issue in space <space_id>",
                    "onlyId": true,
                    "pattern": "<space_id>",
                },
            },
        ],
        "body-max-line-length": [1, "always", 100],
        "header-max-length": [0, "always", 72],
        "scope-ws": [
            2,
            "always",
            {
                "additionalScopes": ["root", "any"],
            },
        ],
        "scope-empty": [2, "never"],
        "type-enum": [2, "always", typeSubjects],
    },
};
