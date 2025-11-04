export default async function rollGroupInitiative() {
    const combat = game.combats?.filter((combat) => combat.isView)?.[0];
    if (!combat)
        return;

    const npcs = combat.turns.filter((c) => c.isNPC);

    const groups = Object.values(
        npcs.reduce<Record<string, Combatant[]>>((acc, npc) => {
            const actorId = npc.actor?.id;
            if (!actorId)
                return acc;
            (acc[actorId] ??= []).push(npc);
            return acc;
        }, {})
    );

    // example usage: iterate groups
    for (const group of groups) {
        const initiative = await (async () => {
            const rolled = group.filter(npc => npc.initiative !== null)?.[0]?.initiative;
            if (rolled !== undefined)
                return rolled;

            await combat.rollInitiative([group[0].id!]);
            return group[0].initiative;
        })();

        for (const npc of group)
            npc.update({ initiative });
    }
}
