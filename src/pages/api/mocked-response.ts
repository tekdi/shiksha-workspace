export const genericEditorFormRead = {
    "id": "api.form.read",
    "params": {
        "status": "successful"
    },
    "responseCode": "OK",
    "result": {
        "form": {
            "type": "content",
            "subtype": "resource",
            "action": "save",
            "component": "*",
            "framework": "*",
            "data": {
                "templateName": "defaultTemplate",
                "action": "save",
                "fields": [
                    {
                        "code": "appicon",
                        "dataType": "url",
                        "description": "App Icon",
                        "editable": true,
                        "index": 1,
                        "inputType": "file",
                        "label": "App Icon",
                        "name": "App Icon",
                        "placeholder": "App Icon",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    },
                    {
                        "code": "name",
                        "dataType": "text",
                        "description": "Title of the content",
                        "editable": true,
                        "index": 2,
                        "inputType": "text",
                        "label": "Title",
                        "name": "Title",
                        "placeholder": "Enter Title",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    },
                    {
                        "code": "description",
                        "dataType": "text",
                        "description": "Brief description",
                        "editable": true,
                        "index": 3,
                        "inputType": "textarea",
                        "label": "Description",
                        "name": "Description",
                        "placeholder": "Brief description about the Book",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    },
                    {
                        "code": "keywords",
                        "dataType": "list",
                        "description": "Keywords for the content",
                        "editable": true,
                        "index": 4,
                        "inputType": "keywordsuggestion",
                        "label": "keywords",
                        "name": "Keywords",
                        "placeholder": "Enter Keywords",
                        "required": false,
                        "visible": true
                    },
                    {
                        "code": "medium",
                        "dataType": "List",
                        "description": "Language",
                        "editable": true,
                        "index": 8,
                        "inputType": "select",
                        "label": "Language",
                        "name": "Langauge",
                        "placeholder": "Select Language",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    },
                    {
                        "code": "audience",
                        "dataType": "list",
                        "description": "Audience",
                        "editable": true,
                        "index": 8,
                        "inputType": "multiselect",
                        "label": "Audience",
                        "name": "Audience",
                        "range": [
                            {
                                "key": "Student",
                                "name": "Student"
                            },
                            {
                                "key": "Teacher",
                                "name": "Teacher"
                            },
                            {
                                "key": "Administrator",
                                "name": "Administrator"
                            },
                            {
                                "key": "Teacher",
                                "name": "Teacher"
                            },
                            {
                                "key": "Other",
                                "name": "Other"
                            }
                        ],
                        "placeholder": "Select Audience",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    },
                    {
                        "code": "attributions",
                        "dataType": "list",
                        "description": "Attributions",
                        "editable": true,
                        "index": 8,
                        "inputType": "text",
                        "label": "Attributions",
                        "name": "attribution",
                        "placeholder": "",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    }
                ]
            },
            "created_on": "2019-09-08T03:04:38.104Z",
            "last_modified_on": "2020-09-08T12:50:30.070Z",
            "rootOrgId": "*"
        }
    },
    "ver": "1.0"
}

export const telemetryResponse = {
    "id": "api.telemetry.post",
    "params": {
        "status": "successful"
    },
    "responseCode": "OK",
    "result": {
        "message": "This is mocked response"
    },
    "ver": "1.0"
}

export const creatLockResponse = {
    "id": "api.lock.create",
    "params": {
        "status": "successful",
    },
    "responseCode": "OK",
    "result": {
        "lockKey": "69d82e1c-6d91-4b2e-a873-39ebeab007b9",
        "expiresAt": "2026-10-09T12:53:41.138Z",
        "expiresIn": 63072000
    }
}