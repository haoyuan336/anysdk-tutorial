
cc.Class({
    extends: cc.Component,

    properties: {
        loginLabel:{
            default: null,
            type: cc.Label
        },
        shareLabel: {
            default: null,
            type: cc.Label
        }
    },
    onLoad(){

        if (cc.sys.isMobile && cc.userPlugin === undefined){
            let agent = anysdk.agentManager;
            cc.userPlugin = agent.getUserPlugin();
            cc.userPlugin.setListener((code, msg)=>{
                cc.log('login code  =' + code + ', ' + msg);
                switch (code){
                    case anysdk.UserActionResultCode.kLoginSuccess:
                        cc.log("登陆成功");
                        this.loginLabel.string = '登陆成功';
                        break;
                    case anysdk.UserActionResultCode.kLoginFail:
                        cc.log("登陆失败");
                        this.loginLabel.string = code + ':' + msg;
                        break;
                    case anysdk.UserActionResultCode.kLoginCancel:
                        this.loginLabel.string = code + ':' + msg;

                        break;
                    case anysdk.UserActionResultCode.kLoginNetworkError:
                        this.loginLabel.string = code + ':' + msg;
                        break;
                    default:
                        break;
                }
            }, this);
        }


        if (cc.sys.isMobile && cc.sharePlugin === undefined){
            let agent = anysdk.agentManager;
            cc.sharePlugin = agent.getSharePlugin();
            cc.sharePlugin.setListener((code, msg)=>{
                cc.log('code = ' + code + ';' + msg);
                this.shareLabel.string = code + ':' + msg;

            }, this);
        }
    },
    onButtonClick(event,customData){
        cc.log("custom data = " + customData);
        switch (customData){
            case 'login':
                if (cc.userPlugin !== undefined){
                    cc.userPlugin.login();
                }
                break;
            case 'share':
                if (cc.sharePlugin !== undefined){
                    let info = {
                        title: 'anysdk Test',
                        text: 'anysdk 学习',
                        url: 'baidu.com',
                        mediaType: 2,
                        shareTo:1
                    };
                    cc.sharePlugin.share(info);
                }
              
                break;
            case 'shareFird':
                if (cc.sharePlugin !== undefined){
                    let info = {
                        title: 'anysdk Test',
                        text: 'anysdk 学习',
                        url: 'baidu.com',
                        mediaType: 2,
                        shareTo:0
                    };
                    cc.sharePlugin.share(info);
                }
                break;
            default:
                break;
        }
    }
});
