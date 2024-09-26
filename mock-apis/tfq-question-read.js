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
            "mimeType": "application/vnd.sunbird.question",
            "media": [],
            "editorState": {
                "options": [
                    {
                        "answer": true,
                        "value": {
                            "body": "<p>False</p>",
                            "value": 0
                        }
                    },
                    {
                        "answer": false,
                        "value": {
                            "body": "<p>True</p>",
                            "value": 1
                        }
                    }
                ],
                "question": "<p>Is Apple green in colour?</p>"
            },
            "templateId": "mcq-vertical",
            "answer": "<div class='answer-container'><div class='answer-body'><p>False</p></div></div>",
            "complexityLevel": [],
            "maxScore": 1,
            "solutions": {},
            "interactions": {
                "response1": {
                    "type": "choice",
                    "options": [
                        {
                            "label": "<p>False</p>",
                            "value": 0,
                            "hint": ""
                        },
                        {
                            "label": "<p>True</p>",
                            "value": 1,
                            "hint": ""
                        }
                    ],
                    "validation": {
                        "required": "Yes"
                    }
                }
            },
            "hints": {},
            "primaryCategory": "True False Question",
            "name": "TFQ",
            "responseDeclaration": {
                "response1": {
                    "cardinality": "single",
                    "type": "integer",
                    "correctResponse": {
                        "value": 0
                    },
                    "mapping": [
                        {
                            "value": 0,
                            "score": 1
                        }
                    ]
                }
            },
            "outcomeDeclaration": {
                "maxScore": {
                    "cardinality": "single",
                    "type": "integer",
                    "defaultValue": 1
                },
                "hint": {
                    "cardinality": "single",
                    "type": "string",
                    "defaultValue": "9b51669f-fa3d-4ee4-b4df-88cd9c5c68d5"
                }
            },
            "interactionTypes": [
                "choice"
            ],
            "qType": "MCQ",
            "body": "<div class='question-body' tabindex='-1'><div class='mcq-title' tabindex='0'><p>Is Apple green in colour?</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
            "createdBy": "5a587cc1-e018-4859-a0a8-e842650b9d64",
            "board": "State (Tamil Nadu)",
            "medium": [
                "English"
            ],
            "gradeLevel": [
                "Class 4"
            ],
            "subject": [
                "English"
            ],
            "author": "Guest new name",
            "channel": "01269878797503692810",
            "framework": "tn_k-12_5",
            "copyright": "tn",
            "audience": [
                "Student"
            ],
            "license": "CC BY 4.0"
        }
    }
}

module.exports = {
    questionReadResponse: questionRead
};