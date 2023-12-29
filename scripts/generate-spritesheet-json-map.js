import fs from 'fs';

const numberOfMaxLayers = 9;
const possibleLayers = [ ... Array(numberOfMaxLayers)].map((_, i) => ++i);

//const c = {};

fs.writeFileSync(`public/spritesheets/spritesheet-map.json`, JSON.stringify(fs.readdirSync('public/sheet_definitions')
    .filter(file => file.includes('.json'))
    .map(file => {
        const data = JSON.parse(fs.readFileSync(`public/sheet_definitions/${file}`), null, 4);
        const layers = possibleLayers
            .map(layerId => `layer_${layerId}` in data ? layerId : "")
            .filter(layer => layer !== "")
            .map(layerId => ({ ... data[`layer_${layerId}`], ... { layerId } }));
        const newData = {};
        Object.entries(data)
          .filter(([key, value]) => !key.includes("layer_"))
          .forEach(([key, value]) => {
            newData[key] = value;
            //key === "type_name" ? c[value] = value : null; 
        });
        return { ... newData, ... { layers }};
    })
, null, 4));

//console.log(c);