const questionRead = {
    "id": "api.question.read",
    "ver": "5.0",
    "ts": "2024-06-10T05:54:36ZZ",
    "params": {
        "resmsgid": "8e216da8-066a-404f-8532-a5cf940f8014",
        "msgid": null,
        "err": null,
        "status": "successful",
        "errmsg": null
    },
    "responseCode": "OK",
    "result": {
        "question": {
            "subject": [
                "Accountancy"
            ],
            "responseDeclaration": {
                "response1": {
                    "cardinality": "ordered",
                    "type": "map",
                    "correctResponse": {
                        "value": [
                            {
                                "lhs": 0,
                                "rhs": 0
                            },
                            {
                                "lhs": 1,
                                "rhs": 1
                            }
                        ]
                    },
                    "mapping": [
                        {
                            "value": {
                                "lhs": 0,
                                "rhs": 0
                            },
                            "score": 0.5
                        },
                        {
                            "value": {
                                "lhs": 1,
                                "rhs": 1
                            },
                            "score": 0.5
                        }
                    ]
                }
            },
            "medium": [
                "English"
            ],
            "mimeType": "application/vnd.sunbird.question",
            "media": [],
            "body": "<div class='question-body' tabindex='-1'><div class='mtf-title' tabindex='0'><p>Match the pairs</p></div><div data-match-interaction='response1' class='mtf-horizontal'></div></div>",
            "editorState": {
                "options": {
                    "left": [
                        {
                            "value": {
                                "body": "<p>2</p>",
                                "value": 0
                            }
                        },
                        {
                            "value": {
                                "body": "<p>3</p>",
                                "value": 1
                            }
                        }
                    ],
                    "right": [
                        {
                            "value": {
                                "body": "<p>even</p>",
                                "value": 0
                            }
                        },
                        {
                            "value": {
                                "body": "<p>odd</p>",
                                "value": 1
                            }
                        }
                    ]
                },
                "question": "<p>Match the pairs</p>"
            },
            "templateId": "mtf-horizontal",
            "interactions": {
                "response1": {
                    "type": "match",
                    "options": {
                        "left": [
                            {
                                "label": "<p>2</p>",
                                "value": 0
                            },
                            {
                                "label": "<p>3</p>",
                                "value": 1
                            }
                        ],
                        "right": [
                            {
                                "label": "<p>even</p>",
                                "value": 0
                            },
                            {
                                "label": "<p>odd</p>",
                                "value": 1
                            }
                        ]
                    },
                    "validation": {
                        "required": "Yes"
                    }
                }
            },
            "gradeLevel": [
                "Class 1"
            ],
            "primaryCategory": "Match The Following Question",
            "identifier": "do_11406399576154112013",
            "visibility": "Parent",
            "solutions": {},
            "hints": {},
            "outcomeDeclaration": {
                "maxScore": {
                    "cardinality": "multiple",
                    "type": "integer",
                    "defaultValue": 1
                }
            },
            "qType": "MTF",
            "maxScore": 1,
            "interactionTypes": [
                "match"
            ],
            "answer": "<div class='match-container'><div class='left-options'><div class='left-option'><p>2</p></div><div class='left-option'><p>3</p></div></div><div class='right-options'><div class='right-option'><p>even</p></div><div class='right-option'><p>odd</p></div></div></div>",
            "name": "MTF",
            "board": "State(Tamil Nadu)"
        }
    }
}

module.exports = {
    questionReadResponse: questionRead
};