# savitri

## Install

1. Clone this repository.
2. Run each command for build.  

    For savitri
    ```sh
    make savitri
    ```

    For gayatri
    ```sh
    make gayatri
    ```
3. Go to Extentions section of Chrome.
4. Turn on Developer mode.
5. Press `Load unpacked`.
6. Select `savitri` or `gayatri` folder.

## How to use.

### savitri

Now coding.

### gayatri

First, make sure of enabling the `#native-file-system-api` flag in `chrome://flags`. Enter "[chrome://flags/#native-file-system-api](chrome://flags/#native-file-system-api)" in your address bar to change your setting. 

 This use localstorage to store URL lists temporary.  

![ScreenShot01](public/img/01.png)

Press `Export log file` to save all URLs listed. Press `Clear LocalStorage` to delete all URLs listed.

## Troubleshooting 

If you have some problem, `make clean` and rebuild.
