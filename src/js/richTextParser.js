export const richTextParser = {
    convertToMarkdown,
    listText,
    styleText
}

function styleText(line) {
    let formattingTags = Object.keys(line);
    let lineText = line.text;
    if (line.type === "text") {
        if (formattingTags.indexOf("bold") != -1) {
            lineText = `<strong>${lineText}</strong>`;
        }
        if (formattingTags.indexOf("underline") != -1) {
            lineText = `<u>${lineText}</u>`;
        }
        if (formattingTags.indexOf("strikethrough") != -1) {
            lineText = `<s>${lineText}</s>`;
        }
        if (formattingTags.indexOf("italic") != -1) {
            lineText = `<i>${lineText}</i>`;
        }
        if (lineText === "") {
            lineText = "\n";
        }
    }
    return lineText;
}

function listText(paragraph) {
    let paragraphText = "";
    if (paragraph.format === "ordered") {
        let ol = "";
        paragraph.children.forEach((li) => {
            ol += `<li><p>${li.children[0].text}</p></li>`;
        });
        ol = `<ol>${ol}</ol>`;
        paragraphText += `${ol}`;
    }
    if (paragraph.format === "unordered") {
        let ul = "";
        paragraph.children.forEach((li) => {
            let liText = "";
            li.children.forEach((child) => {
                liText += styleText(child);
            });
            ul += `<li><p>${liText}</p></li>`;
        });
        ul = `<ul>${ul}</ul>`;
        paragraphText += `${ul} `;
    }

    return paragraphText;
}

function convertToMarkdown(content) {
    let text = "";
    content.forEach((paragraph) => {
        let formattedLine = "";
        if (paragraph.type === "paragraph") {
            paragraph.children.forEach((line) => {
                let addText = styleText(line);
                formattedLine += addText;
            });
        }
        if (paragraph.type === "list") {
            formattedLine += listText(paragraph);
        }
        if (paragraph.type === "image") {
            let url = paragraph.image.url;
            text += `<div class="image-container">
                        <img class="pre-image" src="${url}">
                    </div>`;
        }
        text += `<p>${formattedLine}</p>`;
    });

    return text;
}