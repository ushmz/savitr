# savitr

This is experiment system for my graduate thesis.
The purpose is to collect behavior logs of user in information retrieval with proposal interface.

## Background

For better advertiseing, various ad provider use tracking system like third party cookie.
This kinds of tracking system is efficient for better ad, but users' privacy is sacrificed.
However, most user does not aware that thier behavior data is collected by these tracking system.
So, most users do not have enough chance to think about thier privacy protection.

## My proposal

Before user visits a webpage, show web page titles they had been visited in the past that have possibility to be collected.

![proposal overview](./public/img/samples/sample_result_linked.png)
<!-- ![proposal overview](https://github.com/ushmz/savitr/blob/main/public/img/samples/sample_result_linked.png) -->

## Install

This system is built as chrome extension.
~~You can get package from release.~~  
**The API server is no longer worked. So this package does not work properly.(Updated)**

### Build from sorce

1. Get source from release.
2. Go to `savitr` directory, and run following command for build.

    ```sh
    npm install
    npm run build
    ```

3. Go to Extentions setting in Chrome.
4. Turn on Developer mode.
5. Press `Load unpacked`.
6. Select `dist/savitri` folder.
