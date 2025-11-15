export default async function resetTokenImg() {

    // Get the selected token
    for (const token of canvas?.tokens?.controlled ?? []) {
        // Get the prototype token data
        const actor = token.actor;
        if (!actor) {
            ui.notifications?.error(`No actor found for token: ${token.name}.`);
            continue;
        }

        const protoImg = actor.prototypeToken.texture.src ?? "";

        const pickerResult = await (async () => {
            try {
                return await foundry.applications.apps.FilePicker.implementation.browse("data", protoImg, { wildcard: true });
            } catch {
            }
            return;
        })();
        const wildResult = pickerResult?.files;
        if (!wildResult || wildResult.length === 0) {
            ui.notifications?.error(`${token.name} No image for: ` + protoImg);
            continue;
        }

        const newImg = (() => {
            if (wildResult.length === 1)
                return wildResult[0];
            const randomIdx = Math.floor(Math.random() * wildResult.length);
            return wildResult[randomIdx];
        })();

        // Force Foundry to re‑randomize the wildcard image
        await token.document.update({
            texture: { src: newImg }
        });

        console.log(`${token.name} image rerandomized from wildcard path: ${newImg}`);
    }
}
