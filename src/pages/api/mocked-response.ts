export const genericEditorSaveFormResponse = {
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
                        "code": "audience",
                        "dataType": "list",
                        "description": "Audience",
                        "editable": true,
                        "index": 5,
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
                            }
                        ],
                        "placeholder": "Select Audience",
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

export const genericEditorReviewFormResponse = {
    "id": "api.form.read",
    "params": {
        "resmsgid": "3f255e2a-c31a-4396-9d95-1e8b42b3ed61",
        "msgid": "9754ec68-3862-4489-9f3a-3eca797257e3",
        "status": "successful"
    },
    "responseCode": "OK",
    "result": {
        "form": {
            "type": "content",
            "subtype": "resource",
            "action": "review",
            "component": "*",
            "framework": "*",
            "data": {
                "templateName": "defaultTemplate",
                "action": "review",
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
                        "code": "state",
                        "visible": true,
                        "depends": [
                            "board",
                            "medium",
                            "gradeLevel",
                            "courseType",
                            "subject",
                            "topic"
                        ],
                        "editable": true,
                        "dataType": "text",
                        "renderingHints": {},
                        "description": "State",
                        "index": 5,
                        "label": "State",
                        "required": true,
                        "name": "State",
                        "inputType": "select",
                        "placeholder": "State"
                    },
                    {
                        "code": "board",
                        "visible": true,
                        "depends": [
                            "medium",
                            "gradeLevel",
                            "courseType",
                            "subject"
                        ],
                        "editable": true,
                        "dataType": "text",
                        "renderingHints": {},
                        "description": "Board",
                        "index": 6,
                        "label": "Board/Syllabus",
                        "required": true,
                        "name": "Board/Syllabus",
                        "inputType": "select",
                        "placeholder": "Select Board/Syllabus"
                    },
                    {
                        "code": "medium",
                        "visible": true,
                        "depends": [
                            "gradeLevel",
                            "courseType",
                            "subject"
                        ],
                        "editable": true,
                        "dataType": "list",
                        "renderingHints": {},
                        "description": "",
                        "index": 7,
                        "label": "Medium",
                        "required": true,
                        "name": "medium",
                        "inputType": "multiselect",
                        "placeholder": "Select Medium"
                    },
                    {
                        "code": "gradeLevel",
                        "visible": true,
                        "depends": [
                            "courseType",
                            "subject"
                        ],
                        "editable": true,
                        "dataType": "list",
                        "renderingHints": {},
                        "description": "Class",
                        "index": 8,
                        "label": "Class",
                        "required": true,
                        "name": "Class",
                        "inputType": "multiselect",
                        "placeholder": "Select Class"
                    },
                    {
                        "code": "courseType",
                        "visible": true,
                        "depends": [
                            "subject"
                        ],
                        "editable": true,
                        "dataType": "list",
                        "renderingHints": {},
                        "description": "",
                        "index": 9,
                        "label": "Course Type",
                        "required": true,
                        "name": "Course Type",
                        "inputType": "multiselect",
                        "placeholder": "Course Type"
                    },
                    {
                        "code": "subject",
                        "visible": true,
                        "depends": [],
                        "editable": true,
                        "dataType": "list",
                        "renderingHints": {},
                        "description": "",
                        "index": 10,
                        "label": "Subject",
                        "required": true,
                        "name": "Subject",
                        "inputType": "multiselect",
                        "placeholder": "Select Subject"
                    },
                    {
                        "code": "audience",
                        "dataType": "list",
                        "description": "Audience",
                        "editable": true,
                        "index": 11,
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
                            }
                        ],
                        "placeholder": "Select Audience",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    },
                    {
                        "code": "isForOpenSchool",
                        "dataType": "text",
                        "description": "Indicate if this should be visible on open school",
                        "editable": true,
                        "index": 12,
                        "inputType": "select",
                        "label": "Show on open school?",
                        "name": "Open School Visibility",
                        "range": [
                            {
                                "key": "Yes",
                                "name": "Yes"
                            },
                            {
                                "key": "No",
                                "name": "No"
                            }
                        ],
                        "placeholder": "Please select an option",
                        "renderingHints": {},
                        "required": true,
                        "visible": true
                    },
                    {
                        "code": "program",
                        "dataType": "text",
                        "description": "Program",
                        "editable": true,
                        "index": 13,
                        "inputType": "select",
                        "label": "Program",
                        "name": "Program",
                        "range": [
                            {
                                "name": "Second Chance",
                                "Value": "secondchance"
                            },
                            {
                                "name": "Youthnet",
                                "value": "youthnet"
                            },
                        ],
                        "placeholder": "Please select an option",
                        "renderingHints": {},
                        "required": true,
                        "visible": true
                    }
                ]
            },
            "created_on": "2024-07-31T06:21:34.669Z",
            "last_modified_on": "2024-07-31T07:20:14.642Z",
            "rootOrgId": "*"
        }
    },
    "ts": "2024-10-10T12:25:59.637Z",
    "ver": "1.0"
}

export const genericEditorRequestForChangesFormResponse = {
    "id": "api.form.read",
    "params": {
        "resmsgid": "dd529494-4996-47c8-849d-f5862426fb39",
        "msgid": "06aa0ffa-306f-42eb-b7d6-b15596b858fe",
        "status": "successful"
    },
    "responseCode": "OK",
    "result": {
        "form": {
            "type": "content",
            "subtype": "resource",
            "action": "requestforchanges",
            "component": "*",
            "framework": "*",
            "data": {
                "templateName": "defaultTemplate",
                "action": "requestforchanges",
                "fields": [{ "contents": [] }]
            },
            "created_on": "2019-09-08T15:25:00.291Z",
            "last_modified_on": "2020-08-24T06:06:08.120Z",
            "rootOrgId": "*"
        }
    },
    "ts": "2024-10-25T07:24:32.384Z",
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