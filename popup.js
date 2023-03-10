function registerSettings() {
	// Create the setting for disabling/re-enabling the popup.
	game.settings.register("foundry-pf2e-vaulted-weapon-masters", "popupVis", {
		name: "One-Time Popup",
		scope: "client",
		hint: "Renables the popup displayed when the module was first activated, will force a reload to immediately present the pop up, useful if you need to retrive the bug report URL ",
		requiresReload: true,
		config: true,
		type: Boolean,
		default: true
})
};

Hooks.once("init", () => {
	//Wait until the game is initialized, then register the settings created previously.
	registerSettings();
});

async function openIntroduction (){
	const journals = await game.packs.get("foundry-pf2e-vaulted-weapon-masters.vaulted-weapon-masters-journals").getDocuments();
	const introduction = journals.filter(e => e.id == "CGM7KN8WMUMcHSl1")[0]
	introduction.sheet.render(true)
	game.settings.set("foundry-pf2e-vaulted-weapon-masters", "popupVis", false)
}

Hooks.once('ready', async function () {
    if (game.user.isGM) {
        if (game.settings.get("foundry-pf2e-vaulted-weapon-masters", "popupVis") == true) {
            let d = new Dialog({
                title: "Vaulted Weapon Masters Activated",

                content: `
                <p>
								Thank you for purchasing Eldritch Archetypes: Vaulted Weapon Masters by Dylan Wojeck, Marceline Miller, Braden Menke, Matthew Fu, and the rest of Eldritch Osiris Games!
								</p>
								<p>For a summary of your new content click the Introduction button below</p>
								<p>
								This Foundry VTT module has been prepared by Braden "Delioth" Menke of Eldritch Osiris Games, please report any bugs <a href="https://github.com/Eldritch-Osiris-Games/foundry-pf2e-vaulted-weapon-masters/issues">here!</a>
								</p>
                `,
                buttons: {
									one: {
											icon: '<i class="fas fa-clipboard-list"></i>',
											label: "Introduction",
											callback: () => openIntroduction()
									},
                    two: {
                        icon: '<i class="fas fa-times-circle"></i>',
                        label: "Close",
                        callback: () => game.settings.set("foundry-pf2e-vaulted-weapon-masters", "popupVis", false)
                    },
                },
            },{ width: 450});
            d.render(true);
        }
    }
})
