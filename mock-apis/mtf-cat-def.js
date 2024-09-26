const mtfCategoryRead = {
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
            "identifier": "obj-cat:match-the-following-question_question_all",
            "objectMetadata": {
                "config": {},
                "schema": {
                    "properties": {
                        "interactionTypes": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "enum": [
                                    "match"
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
            "name": "Match The Following Question",
            "forms": {}
        }
    }
}

module.exports = {
    mtfCategoryDefinitionResponse: mtfCategoryRead
};