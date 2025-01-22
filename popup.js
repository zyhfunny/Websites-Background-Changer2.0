const translations = {

    en: {
        pic: "image",
        ap: "API",
        opa: "Opacity",
        picapi: "image api",
        bkg: "background"
    },

    zh: {
        pic: "ͼ��",
        ap: "API",
        opa: "��ҳ��͸����",
        picapi: "�Զ���ͼƬapi",
        bkg: "���ñ���"
    }
};
function setLanguage(language) {
    document.getElementById('pic').innerText = translations[language].pic;
    document.getElementById('ap').innerText = translations[language].ap;
    document.getElementById('opa').innerText = translations[language].opa;
    document.getElementById('picapi').innerText = translations[language].picapi;
    document.getElementById('bkg').innerText = translations[language].bkg;
}
$(document).ready(() => {
    chrome.storage.local.get(['ExtensionOn', 'Opacity','APIinput','Background'], function(data) {
        $("input[name='image']").value = data.ExtensionOn;
        if (data.Background == true) $('#img').eq(0).prop('checked', true);
        else $('#api').eq(0).prop('checked', true);
        $("#CheckboxExt")[0].checked = data.ExtensionOn;
        $("#userapi").val(data.APIinput);
        $('#ValuebarExt')[0].value = data.Opacity;
    });

    $("input[name='image']").change(function () {
        chrome.tabs.reload();
        var flag;
        if (this.value == 1) flag = true;
        else flag = false;
        chrome.storage.local.set({ Background: flag }, () =>
            chrome.tabs.query({}, (tabs) =>
                tabs.forEach((tab) =>
                    chrome.tabs.sendMessage(tab.id, "Background")
                )
            )
        );
    });
    $('#CheckboxExt').click(function () {
        chrome.tabs.reload();
        chrome.storage.local.set({ ExtensionOn: $(this)[0].checked }, () =>
            chrome.tabs.query({}, (tabs) =>
                tabs.forEach((tab) =>
                    chrome.tabs.sendMessage(tab.id, "ExtensionOn")
                )
            )
        );
    });

    $('#userapi').bind('input propertychange', function () {
        chrome.tabs.reload();
        chrome.storage.local.set({ APIinput: $(this).val() }, () =>
            chrome.tabs.query({}, (tabs) =>
                tabs.forEach((tab) =>
                    chrome.tabs.sendMessage(tab.id, "APIinput")
                )
            )
        );
    });

    $('#enBtn').click(function (event) {
        if (event.type === "click") {
            setLanguage('en');
            $("#userapi").attr("placeholder", "please input your api's url");
        }
    });

    $('#zhBtn').click(function (event) {
        if (event.type === "click") {
            setLanguage('zh');
            $("#userapi").attr("placeholder", "����������ͼƬapi��url");
        }
    });

    $('#ValuebarExt')[0].onchange = function () {
        chrome.storage.local.set({Opacity: this.value}, () =>
            chrome.tabs.query({}, (tabs) =>
                tabs.forEach((tab) =>
                    chrome.tabs.sendMessage(tab.id, "Opacity")
                )
            )
        );
    };
});
