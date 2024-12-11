export const playerConfig = {
  context: {
    mode: "play",
    partner: [],
    pdata: {
      id: "pratham.admin.portal",
      ver: "1.0.0",
      pid: "admin-portal",
    },
    contentId: "do_12345",
    sid: "",
    uid: "",
    timeDiff: -0.089,
    channel: "",
    tags: [""],
    did: "",
    contextRollup: {},
    objectRollup: {},
    userData: { firstName: "Guest", lastName: "User"},

    //telemetry
    host: "",
    endpoint: "/v1/telemetry",
  },
  config: {
    showEndPage: false,
    endPage: [{ template: "assessment", contentType: ["SelfAssess"] }],
    showStartPage: true,
    host: "",
    overlay: { showUser: false },
    splash: {
      text: "",
      icon: "",
      bgImage: "assets/icons/splacebackground_1.png",
      webLink: "",
    },
    apislug: "",
    repos: ["/sunbird-plugins/renderer"],
    plugins: [
      { id: "org.sunbird.iframeEvent", ver: 1, type: "plugin" },
      { id: "org.sunbird.player.endpage", ver: 1.1, type: "plugin" },
    ],
    sideMenu: {
      showShare: false,
      showDownload: true,
      showExit: true,
      showPrint: false,
      showReplay: true,
    },
  },
  metadata: {},
  data: {},
};

export const V1PlayerConfig = {
  config: {
    whiteListUrl: [],
    showEndPage: false,
    endPage: [
      {
        template: "assessment",
        contentType: ["SelfAssess"],
      },
    ],
    showStartPage: true,
    host: "",
    overlay: {
      enableUserSwitcher: true,
      showOverlay: true,
      showNext: true,
      showPrevious: true,
      showSubmit: false,
      showReload: false,
      showUser: false,
      menu: {
        showTeachersInstruction: false,
      },
    },
    splash: {
      text: "",
      icon: "",
      bgImage: "assets/icons/splacebackground_1.png",
      webLink: "",
    },
    apislug: "",
    repos: ["/sunbird-plugins/renderer"],
    plugins: [
      {
        id: "org.sunbird.iframeEvent",
        ver: 1,
        type: "plugin",
      }
    ],
    sideMenu: {
      showShare: true,
      showDownload: true,
      showExit: false,
    },
    enableTelemetryValidation: false,
  },
  context: {
    mode: "play",
    partner: [],
    pdata: {
      id: "pratham.admin.portal",
      ver: "1.0.0",
      pid: "admin-portal",
    },
    contentId: "do_12345",
    sid: "",
    uid: "",
    timeDiff: -1.129,
    contextRollup: {},
    channel: "",
    did: "",
    dims: [],
    tags: [""],
    app: [""],
    cdata: [],
    userData: {
      firstName: "Guest",
      lastName: "User",
    },
  },
  data: {},
  metadata: {}
};
