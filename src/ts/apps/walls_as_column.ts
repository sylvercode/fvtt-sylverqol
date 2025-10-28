

export default function wallsAsColumn(attenuation: number | null = 10) {
    const selectedWalls = game.canvas?.walls?.controlled ?? [];
    for (const wall of selectedWalls) {
        wallAsColumn(wall.document, attenuation);
    }
}

function wallAsColumn(wall: WallDocument, attenuation: number | null) {
    const c1 = { x: wall.c[0], y: wall.c[1] };
    const c2 = { x: wall.c[2], y: wall.c[3] };

    const ptTL = { x: Math.min(c1.x, c2.x), y: Math.min(c1.y, c2.y) };
    const ptTR = { x: Math.max(c1.x, c2.x), y: Math.min(c1.y, c2.y) };
    const ptBR = { x: Math.max(c1.x, c2.x), y: Math.max(c1.y, c2.y) };
    const ptBL = { x: Math.min(c1.x, c2.x), y: Math.max(c1.y, c2.y) };

    const threshold = !attenuation ? null : {
        attenuation: true,
        light: attenuation,
        sound: attenuation,
        sight: attenuation,
    };

    const defaultData: Partial<WallDocument.CreateData> = {
        dir: CONST.WALL_DIRECTIONS.RIGHT,
        move: CONST.WALL_MOVEMENT_TYPES.NONE,
        sight: CONST.WALL_SENSE_TYPES.PROXIMITY,
        sound: CONST.WALL_SENSE_TYPES.PROXIMITY,
        light: CONST.WALL_SENSE_TYPES.PROXIMITY,
        threshold
    }

    const scene = wall.parent;
    scene?.createEmbeddedDocuments("Wall", [
        { c: [ptTL.x, ptTL.y, ptTR.x, ptTR.y], ...defaultData },
        { c: [ptTR.x, ptTR.y, ptBR.x, ptBR.y], ...defaultData },
        { c: [ptBR.x, ptBR.y, ptBL.x, ptBL.y], ...defaultData },
        { c: [ptBL.x, ptBL.y, ptTL.x, ptTL.y], ...defaultData },
    ])

    if (wall.id)
        scene?.deleteEmbeddedDocuments("Wall", [wall.id]);
}
