"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
const os = require("os");
const previewContextKey = 'htmlPreview.canShowButton';
function updatePreviewContext(editor) {
    const canShow = !!editor && editor.document.languageId === 'html';
    void vscode.commands.executeCommand('setContext', previewContextKey, canShow);
}
function activate(context) {
    console.log('HTML Preview Pro extension activated');
    let currentPanel = undefined;
    updatePreviewContext(vscode.window.activeTextEditor);
    const previewWebCommand = vscode.commands.registerCommand('extension.previewHtml', () => {
        const editor = getActiveHtmlEditor();
        if (!editor) {
            return;
        }
        const columnToShowIn = vscode.window.activeTextEditor
            ? vscode.ViewColumn.Beside
            : undefined;
        if (currentPanel) {
            currentPanel.reveal(columnToShowIn);
        }
        else {
            currentPanel = vscode.window.createWebviewPanel('htmlPreview', 'HTML Preview', columnToShowIn || vscode.ViewColumn.One, {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(context.extensionPath)],
                retainContextWhenHidden: true
            });
            currentPanel.onDidDispose(() => {
                currentPanel = undefined;
            }, null, context.subscriptions);
        }
        updateWebview(currentPanel, editor.document);
    });
    const previewDesktopCommand = vscode.commands.registerCommand('extension.previewHtmlDesktop', () => __awaiter(this, void 0, void 0, function* () {
        const editor = getActiveHtmlEditor();
        if (!editor) {
            return;
        }
        try {
            const previewUri = yield writeTempPreviewFile(editor.document);
            yield vscode.env.openExternal(previewUri);
        }
        catch (error) {
            console.error('Failed to open desktop preview', error);
            void vscode.window.showErrorMessage('Failed to open desktop preview');
        }
    }));
    context.subscriptions.push(previewWebCommand, previewDesktopCommand);
    // Auto reload when file content changes
    vscode.workspace.onDidChangeTextDocument(event => {
        var _a;
        if (currentPanel && event.document.languageId === 'html' && event.document === ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document)) {
            updateWebview(currentPanel, event.document);
        }
    }, null, context.subscriptions);
    // Auto update when switching active editor
    vscode.window.onDidChangeActiveTextEditor(editor => {
        updatePreviewContext(editor);
        if (currentPanel && editor && editor.document.languageId === 'html') {
            updateWebview(currentPanel, editor.document);
        }
    }, null, context.subscriptions);
}
exports.activate = activate;
function updateWebview(panel, document) {
    panel.title = `Preview: ${path.basename(document.fileName)}`;
    panel.webview.html = getWebviewContent(document.getText());
}
function getActiveHtmlEditor() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        void vscode.window.showErrorMessage('No active text editor found');
        return undefined;
    }
    if (editor.document.languageId !== 'html') {
        void vscode.window.showErrorMessage('Active file is not HTML');
        return undefined;
    }
    return editor;
}
function getWebviewContent(htmlContent) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background-color: #ffffff; 
            color: #333333; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            padding: 0;
            line-height: 1.6;
        }
        html { height: 100%; }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;
}
function writeTempPreviewFile(document) {
    return __awaiter(this, void 0, void 0, function* () {
        const tempFilePath = path.join(os.tmpdir(), `html-preview-${Date.now()}.html`);
        const tempFileUri = vscode.Uri.file(tempFilePath);
        const buffer = Buffer.from(document.getText(), 'utf8');
        yield vscode.workspace.fs.writeFile(tempFileUri, buffer);
        // Clean up temp file after 60 seconds
        setTimeout(() => {
            vscode.workspace.fs.delete(tempFileUri).then(() => undefined, () => undefined);
        }, 60000);
        return tempFileUri;
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map