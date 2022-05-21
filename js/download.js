$(function () {
    var version = document.getElementById('version').textContent;
    console.log(version);//.置き換え_
    var herfv = 'download/TTSP-' + version + '-';
    console.log(herfv);
    /**初期設定 */
    if ($('.dlink-win').data("os") == "win64") {
        $('.dlink-win > small').text("64-bit (.exe)");
    } else if ($('.dlink-win').data("os") == "win32") {
        $('.dlink-win > small').text("32-bit (.exe)");
    } else {
        $('.dlink-osx > small').text("unknown");
    }
    if ($('.dlink-linux').data("os") == "linux64") {
        $('.dlink-linux > small').text("64-bit");
    } else if ($('.dlink-linux').data("os") == "linux32") {
        $('.dlink-linux > small').text("32-bit");
    } else if ($('.dlink-linux').data("os") == "linuxARM") {
        $('.dlink-linux > small').text("ARM");
    } else {
        $('.dlink-osx > small').text("unknown");
    }
    if ($('.dlink-osx').data("os") == "osx") {
        $('.dlink-osx > small').text("macOS 10.9+ (.app)");
    } else {
        $('.dlink-osx > small').text("unknown");
    }
    /*ドロップダウン*/
    $(document).on('click touchend', function (event) {//範囲外クリック
        if (!$(event.target).closest('.dldrop-win').length) {
            $('.other-win').slideUp();
        }
        if (!$(event.target).closest('.dldrop-linux').length) {
            $('.other-linux').slideUp();
        }
    });
    $('.dldrop-win').click(function () {
        $('.other-win').slideToggle();
    });
    $('.dldrop-linux').click(function () {
        $('.other-linux').slideToggle();
    });
    /*ダウンロード変更*/
    $('.type-win').click(function () {
        var winos = $(this).attr("id");
        if (winos == "win64") {
            $('.dlink-win').data('os', 'win64');//data書き換え
            $('.dlink-win > small').text("64-bit (.exe)");//テキスト変更
        } else if (winos == "win32") {
            $('.dlink-win').data('os', 'win32');
            $('.dlink-win > small').text("32-bit (.exe)");
        } else {
            $('.dlink-win').data('os', 'unknown');
            $('.dlink-win > small').text("unknown");
        }
        console.log($('.dlink-win').data('os'));
    });
    $('.type-linux').click(function () {
        var linuxos = $(this).attr("id");
        if (linuxos == "linux64") {
            $('.dlink-linux').data('os', 'linux64');
            $('.dlink-linux > small').text("64-bit");
        } else if (linuxos == "linux32") {
            $('.dlink-linux').data('os', 'linux32');
            $('.dlink-linux > small').text("32-bit");
        } else if (linuxos == "linuxARM") {
            $('.dlink-linux').data('os', 'linuxARM');
            $('.dlink-linux > small').text("ARM");
        } else {
            $('.dlink-linux').data('os', 'unknown');
            $('.dlink-linux > small').text("unknown");
        }
        console.log($('.dlink-linux').data('os'));
    });
    $('.dlink-win').click(function () {
        var select = $(this).data('os');
        var herfs, downloads;
        var link = document.createElement('a');
        if (select == "win64") {
            herfs = herfv + 'win64' + '.zip';
            downloads = "TTSP-" + version + "-win64" + ".zip";
        } else if (select == "win32") {
            herfs = herfv + "win32" + ".zip";
            downloads = "TTSP-" + version + "-win32" + ".zip";
        } else {
            return;
        }
        link.href = herfs;
        link.download = downloads;
        link.click();
    });

    $('.dlink-linux').click(function () {
        var select = $(this).data('os');
        var herfs, downloads;
        var link = document.createElement('a');
        if (select == "linux64") {
            herfs = herfv + 'Linux64' + '.tar';
            downloads = "TTSP-" + version + "-Linux64" + ".tar";
        } else if (select == "linux32") {
            herfs = herfv + "Linux32" + ".tar";
            downloads = "TTSP-" + version + "-Linux32" + ".tar";
        } else if (select == "linuxARM") {
            herfs = herfv + "linux-armv6hf" + ".tar";
            downloads = "TTSP-" + version + "-linux-armv6hf" + ".tar";
        }else {
            return;
        }
        link.href = herfs;
        link.download = downloads;
        link.click();
    });
    $('.dlink-osx').click(function () {
        var select = $(this).data('os');
        var herfs, downloads;
        var link = document.createElement('a');
        if (select == "osx") {
            herfs = herfv + 'osx' + '.zip';
            downloads = "TTSP-" + version + "-osx" + ".zip";
        } else {
            return;
        }
        link.href = herfs;
        link.download = downloads;
        link.click();
    });
    $('#impossible').click(function(){
        $('#impossible+ul').slideToggle();
    });
});