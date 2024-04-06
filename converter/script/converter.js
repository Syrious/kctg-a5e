const convertPrice = (json) => {
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            if (key === 'price' && typeof json[key] === 'object') {
                json[key] = `${json[key].value} ${json[key].denomination}`;
            } else if (typeof json[key] === 'object') {
                convertPrice(json[key]);
            }
        }
    }
}

const inputElement = document.getElementById("jsonFile");
inputElement.addEventListener("change", handleFiles, false);

function replaceSystem(input) {
    input.metadata.system = 'a5e';
    input.source.system = 'a5e';

    input.items.forEach(item => {
        item._stats.systemId = 'a5e';
    });

    input.folders.forEach(folder => {
        folder._stats.systemId = 'a5e';
    });
}

function convertItems(input) {
    input.items.forEach(item => {
        if (item.type === 'loot') {
            item.type = 'object';
        }

        if (item.system && item.system.description && typeof item.system.description === 'object') {
            item.system.description = item.system.description.value;
        }
    });
}


function convert(input) {
    replaceSystem(input)
    convertItems(input)
    convertPrice(input);
}

function handleFiles() {
    const fileList = this.files;

    if (fileList.length) {
        const file = fileList[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const result = JSON.parse(e.target.result);

            convert(result);

            // Save it as a JSON file
            const blob = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'});
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'a5e-result.json';
            a.click();
        }
        reader.readAsText(file);
    }
}