$("[data-toggle=popover]").popover();

function exportStringsToClipoard() {
    var exportedStrings = convertRawToTabular(document.getElementById("rawInput").value);
    const tempT = document.createElement('textarea');
    tempT.value = exportedStrings;
    document.body.appendChild(tempT);
    tempT.select();
    document.execCommand('copy');
    document.body.removeChild(tempT);
}

function convertRawToTabular(rawStrings) {
    var nextCell = '	';
    return removeUnTranslatableStrings(rawStrings)
        .replaceAll(/^\s*[\r\n]/gm, '') // blank lines
        .replaceAll(/  +/g, '') // redundant spaces
        .replaceAll('<resources>', '')
        .replaceAll('<string name="', nextCell)
        .replaceAll('">', nextCell)
        .replaceAll('</string>', '')
        .replaceAll('</resources>', '')
        .replaceAll(/<!--(\s)?/g, '\n')
        .replaceAll(/(\s)?-->(\n)/g, '');
}

function removeUnTranslatableStrings(strings) {
    var lines = strings.split('\n');
    var i = 0;
    while (i < lines.length) {
        if (lines[i].includes('translatable="false"')) {
            lines.splice(i, 1);
        } else {
            i++;
        }
    }
    return lines.join('\n');
}