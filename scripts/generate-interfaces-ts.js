import fs from 'fs';
import JsonToTS from 'json-to-ts';

const csv = fs.readFileSync('public/sheet_definitions/z_positions.csv').toString().split("\n");
let interfaces = "";
fs.readdirSync('public/sheet_definitions').forEach((file, index) => {
  if (!file.includes('.json')) {
    return
  }
  const definition = JSON.parse(fs.readFileSync(`public/sheet_definitions/${file}`));
  const interfaceName = definition.name.replace(/ /gi, "");
  for (let jdx =1; jdx < 10; jdx++) {
    const layerDefinition = definition[`layer_${jdx}`];
    if (layerDefinition !== undefined) {
      var entryIdx = 0;
      for (const entry in csv) {
        const item = csv[entryIdx];
        if (item.includes(file) && item.includes(`layer_${jdx}`)) {
          const requiredZposition = parseInt(item.split(",")[2]);
          definition[`layer_${jdx}`].zPos = requiredZposition;
          fs.writeFileSync(`public/sheet_definitions/${file}`, JSON.stringify(definition, null, 2), function(err) { });
          fs.writeFileSync(`src/interfaces/${interfaceName}_${Date.now()}.ts`, JsonToTS(definition).join(";\n").replace("RootObject", interfaceName) + ";\n");
        }
        entryIdx += 1;
      }
    } else {
      return
    }
  }
});
