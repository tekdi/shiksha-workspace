const mcqCategoryRead = {
    "id": "api.object.category.definition.read",
    "ver": "3.0",
    "ts": "2024-05-09T09:16:41ZZ",
    "params": {
        "resmsgid": "0c3d2c14-0ce4-4a7f-a517-8621110b2e85",
        "msgid": null,
        "err": null,
        "status": "successful",
        "errmsg": null
    },
    "responseCode": "OK",
    "result": {
        "objectCategoryDefinition": {
            "identifier": "obj-cat:multiple-choice-question_question_all",
            "objectMetadata": {
                "config": {
                    maximumOptions: 6
                },
                "schema": {
                    "properties": {
                        "interactionTypes": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "enum": [
                                    "choice"
                                ]
                            }
                        },
                        "mimeType": {
                            "type": "string",
                            "enum": [
                                "application/vnd.sunbird.question"
                            ]
                        }
                    }
                }
            },
            "languageCode": [],
            "name": "Multiple Choice Question",
            "forms": {}
        }
    }
}

module.exports = {
    mcqCategoryDefinitionResponse: mcqCategoryRead
};