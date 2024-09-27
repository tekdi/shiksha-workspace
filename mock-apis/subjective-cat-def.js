const subjectiveCategoryRead = {
    "id": "api.object.category.definition.read",
    "ver": "3.0",
    "ts": "2024-05-20T07:45:00ZZ",
    "params": {
        "resmsgid": "97630cab-ad4e-4db5-b514-0e59cb3891a6",
        "msgid": null,
        "err": null,
        "status": "successful",
        "errmsg": null
    },
    "responseCode": "OK",
    "result": {
        "objectCategoryDefinition": {
            "identifier": "obj-cat:subjective-question_question_01269934121990553633",
            "objectMetadata": {
                "config": {},
                "schema": {
                    "properties": {
                        "mimeType": {
                            "type": "string",
                            "enum": [
                                "application/vnd.sunbird.question"
                            ]
                        },
                        "farmingtype": {
                            "type": "array"
                        },
                        "cropcategory": {
                            "type": "array"
                        },
                        "croptype": {
                            "type": "array"
                        },
                        "cropname": {
                            "type": "array"
                        },
                        "cropvariety": {
                            "type": "array"
                        },
                        "audience": {
                            "type": "array"
                        }
                    }
                }
            },
            "languageCode": [],
            "name": "Subjective Question",
            "forms": {}
        }
    }
}

module.exports = {
    subjectiveCategoryDefinitionResponse: subjectiveCategoryRead
};