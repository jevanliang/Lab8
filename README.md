# Lab8_Starter


## Author(s):
- Trai Pham
- Jerry Liang

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
- A

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
- You would not use unit testing to test the "message" feature, because it contains two functionality of writing a message and sending the message. We would not be unit testing because we should be testing the inidividual functionality of "message" instead of the overall feature.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
- Yes, I would use unit test for the "max message length" feature because it is a single functionality, in which unit testing has to do with testing a single functionality one at a time.

1. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

If headless was set to true, the tests should be taking more time to complete because there are now additional things to render.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

  beforeAll(async () => {
    await page.click('img[alt="settings"]');
    await page.waitForTimeout(500);
  });
