const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"]},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"]},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"user.index":{"uri":"admin\/user","methods":["GET","HEAD"]},"user.create":{"uri":"admin\/user\/create","methods":["GET","HEAD"]},"user.store":{"uri":"admin\/user","methods":["POST"]},"user.show":{"uri":"admin\/user\/{user}","methods":["GET","HEAD"]},"user.edit":{"uri":"admin\/user\/{user}\/edit","methods":["GET","HEAD"]},"user.update":{"uri":"admin\/user\/{user}","methods":["PUT","PATCH"],"bindings":{"user":"id"}},"user.destroy":{"uri":"admin\/user\/{user}","methods":["DELETE"],"bindings":{"user":"id"}},"role.index":{"uri":"admin\/role","methods":["GET","HEAD"]},"role.create":{"uri":"admin\/role\/create","methods":["GET","HEAD"]},"role.store":{"uri":"admin\/role","methods":["POST"]},"role.show":{"uri":"admin\/role\/{role}","methods":["GET","HEAD"]},"role.edit":{"uri":"admin\/role\/{role}\/edit","methods":["GET","HEAD"]},"role.update":{"uri":"admin\/role\/{role}","methods":["PUT","PATCH"],"bindings":{"role":"id"}},"role.destroy":{"uri":"admin\/role\/{role}","methods":["DELETE"],"bindings":{"role":"id"}},"register":{"uri":"register","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"]},"password.update":{"uri":"reset-password","methods":["POST"]},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"logout":{"uri":"logout","methods":["POST"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };