# **Orbital 2021 User Guide**

## Team buttersmarsh (Apollo)

- [**Orbital 2021 User Guide** ](#orbital-2021-user-guide)
  - [Team buttersmarsh (Gemini)](#team-buttersmarsh-gemini)
    - [1. Installation](#1-installation)
    - [2. Usage](#2-usage)
      - [2.1 Main Keypresses](#21-main-keypresses)
      - [2.2 Highlighting ](#22-highlighting)
      - [2.3 Redirecting ](#23-redirecting)
      - [2.4 Settings ](#24-settings)
      - [2.5 Ad Detection](#25-ad-detection)
    - [3. Feedback](#3-feedback)

### 1. Installation

Navigate to the Chrome Web Store and look for the web application 'Synch'. Alternativelty, the link can be found [here](https://chrome.google.com/webstore/detail/synch/dgmaablnmfpnkipeiklohhlfdfbdifjl).

### 2. Usage

#### 2.1 Main Keypresses

| Key-Binding | Functionality                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| ALT + 1     | Toggles between paragraphs.                                                                               |
| ALT + 2     | Toggles between headers.                                                                                  |
| ALT + 3     | Brings up a search bar to search for keywords among the links on the site.                                |
| ALT + 4     | After searching, allows the user to toggle between the results. The titles of the links will be read out. |
| ALT + 0     | Redirects the user to the last link being read out.                                                       |
| ALT + q     | Toggles the webpage in order                                                                              |

The default settings are listed above.

All settings have to be used with 'ALT'. This is to ensure that each keypress is intentional and will not result in accidental/ unwanted browser commands.

The extension works based on keypresses. As such, a single keypress of the bound key will cause it to carry out its functionality.

Hit the same button twice within a time limit to allow the extension to read the previous message instead.

The default time limit is 0.5 seconds.

#### 2.2 Highlighting

To facilitate user experience, the current section that Synch is reading will be highlighted in yellow, as shown below:

![Alt Text](https://media.giphy.com/media/wltXsytlG4GJCbg9J3/giphy.gif)

#### 2.3 Redirecting

By default, users can hit `ALT + 3` to bring up a search bar. This search bar is used to search for hyperlinks on the page.

![](/imgs/hyperlink_search.jpg)

Users can then search for a keyword, i.e if the site had a link directing users to a 'World News' section, users can just type 'world' in the searchbar.

There are two results of the search, either a success message or a failure message from the engine if it could not find anything matching your search.

Users can then hit 'ALT + 4' to cycle through the results of the search if it was successful. The engine then reads the titles of the links. 

Users can then hit 'ALT + 0' to redirect the site to the last read title.


#### 2.4 Settings

| Settings | Property                                                  |
| -------- | --------------------------------------------------------- |
| rate     | Changes the speed at which the reader will read out text. |

Apart from the key bindings mentioned under section 2.1, these are the other settings present which allows the user to customize their screen reader.

To bring up the settings menu, simply navigate to the top right of the screen to find the extensions manager.

![](/imgs/settings_extension.jpg)

Under options, the user can click this to bring one to the settings page as shown below.

![](/imgs/settings_page.jpg)

Here, the user is able to customize their settings accordingly.

There are a few keys which are not allowed. Among them are the 'SHIFT, TAB, SPACE, d, e, f, \' keys. This is due to conflicts with the browser default commands. We seek your understanding to work with the constraints and would recommend users to use number/ alphabet keys.

Since all options are used with 'ALT', it is enabled by default. Hence, if '1' is used as a keybind, it will only be activated upon 'ALT + 1', and users only need to key '1' into the text field.

#### 2.5 Ad Detection

The screen readers present on the web as of now often do not have ad support and will usually say "ad" when toggled over. As such, we wanted to have built in support to avoid such issues by detecting ads and blocking them. For non visually impaired individuals, we hope that this also provides a better user experience. However, our ad detection is not full proof, and as such may miss certain ads.

*NOTE: The ad detection may at times interfere with images on the site either due to the ad detection's strength/ format of the website.*

![](/imgs/adPower.jpg)

Users may then right clidk on what they deem is an ad, and under 'Synch', there will be an option to report an ad.

![](/imgs/reportAd.jpg)

### 3. Feedback

Thanks for using our web extension, any and all feedback is welcome.

Feel free to fill in our anonymous [google form](https://forms.gle/shDJbKfKJ92cbWFu9) to provide us with feedback.


