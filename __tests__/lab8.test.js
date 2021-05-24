describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”

    let urlContain;
    await page.click('journal-entry:nth-child(1)');

    if (page.url().includes("/#entry1")) {urlContain = true; }
    expect(urlContain).toBe(true);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    let headerUpdated;
    var giveHeader = await page.$eval("h1", head => head.textContent);

    if(giveHeader == "Entry 1") { headerUpdated = true; }
    expect(headerUpdated).toBe(true);

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
     var oTitle, oDate, oContent, oImageSRC, oImageALT;
     oTitle = "You like jazz?";
     oDate = "4/25/2021";
     oContent = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.";
     oImageSRC = 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455';
     oImageALT = 'bee with sunglasses';

     var entryPage, contents, guts;
     entryPage = await page.$('entry-page');
     contents = await entryPage.getProperty('entry');
     guts = await contents.jsonValue();

     var matching = true;
     if (oTitle != guts.title) { matching = false; }
     if (oDate != guts.date) { matching = false; }
     if (oContent != guts.content) { matching = false; }
     if (oImageSRC != guts.image.src) { matching = false; }
     if (oImageALT != guts.image.alt) { matching = false; }
     expect(matching).toBe(true);


  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

    var classy, matching;
    classy = await page.evaluate(() => { return document.querySelector('body').className});

    if(classy == "single-entry") { matching = true; }
    expect(matching).toBe(true);
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”

    let urlContain;
    await page.click('img[alt="settings"]');
    
    if (page.url().includes("/#settings")) {urlContain = true; }
    expect(urlContain).toBe(true);

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”

    let headerUpdated;
    var giveHeader = await page.$eval("h1", head => head.textContent);

    if(giveHeader == "Settings") { headerUpdated = true; }
    expect(headerUpdated).toBe(true);

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    var classy, matching;
    classy = await page.evaluate(() => document.querySelector('body').className);

    if(classy == "settings") { matching = true; }
    expect(matching).toBe(true);
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    let urlContain;
    await page.goBack();

    if (page.url().includes("/#entry1")) {urlContain = true; }
    expect(urlContain).toBe(true);

  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, user should be back at home page', async() => {
    let urlContain;
    await page.goBack();

    if (page.url().includes('http://127.0.0.1:5500')) {urlContain = true; }
    expect(urlContain).toBe(true);
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: On homepage - checking page header title', async () => {

    let headerUpdated;
    var giveHeader = await page.$eval("h1", head => head.textContent);

    if(giveHeader == "Journal Entries") { headerUpdated = true; }
    expect(headerUpdated).toBe(true);

  });



  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On homepage - checking class atribute of body element', async () => {
    var classy, matching;
    classy = await page.evaluate(() => document.querySelector('body').className);

    if(classy == "") { matching = true; }
    expect(matching).toBe(true);

  });


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Check url after clicking on second entry', async () => {
    let urlContain;
    await page.click('journal-entry:nth-child(2)');

    //expect(page.url()).toMatch(/#entry2/);
    if (page.url().includes('/#entry2')) {urlContain = true; }
    expect(urlContain).toBe(true);

  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Check title after clicking on second entry', async() => {
    let headerUpdated;
    var giveHeader = await page.$eval("h1", head => head.textContent);

    if(giveHeader == "Entry 2") { headerUpdated = true; }
    expect(headerUpdated).toBe(true);

  });


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: For the second entry on the entry page, check to see if contents match', async() => {
     var oTitle, oDate, oContent, oImageSRC, oImageALT;
     oTitle = "Run, Forrest! Run!";
     oDate = "4/26/2021";
     oContent = "Mama always said life was like a box of chocolates. You never know what you're gonna get.";
     oImageSRC = "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg";
     oImageALT = 'forrest running';

     var entryPage, contents, guts;
     entryPage = await page.$('entry-page');
     contents = await entryPage.getProperty('entry');
     guts = await contents.jsonValue();

     var matching = true;
     if (oTitle != guts.title) { matching = false; }
     if (oDate != guts.date) { matching = false; }
     if (oContent != guts.content) { matching = false; }
     if (oImageSRC != guts.image.src) { matching = false; }
     if (oImageALT != guts.image.alt) { matching = false; }
     expect(matching).toBe(true);

  }, 10000);


    // create your own test 18
    // define and implement test17: Verify the url is correct when clicking on the third entry
    it('Test18: Check url after clicking on third entry', async () => {
      await page.goBack();
      await page.click('journal-entry:nth-child(3)');

      let urlContain;
      if (page.url().includes('/#entry3')) {urlContain = true; }
      expect(urlContain).toBe(true);
    });

  // create your own test 18
    // define and implement test15: Verify the title is current when clicking on the second entry
    it('Test18: Check title after clicking on third entry', async() => {
      let headerUpdated;
      var giveHeader = await page.$eval("h1", head => head.textContent);
  
      if(giveHeader == "Entry 3") { headerUpdated = true; }
      expect(headerUpdated).toBe(true);
    });
  

      // create your own test 19
    // define and implement test19: Verify the url is correct when clicking on the fourth entry
    it('Test19: Check url after clicking on fourth entry', async () => {
      await page.goBack();
      await page.click('journal-entry:nth-child(4)');
      
      let urlContain;
      if (page.url().includes('/#entry4')) {urlContain = true; }
      expect(urlContain).toBe(true);
    });
  
  // create your own test 20
    // define and implement test20: Verify the title is current when clicking on the fourth entry
    it('Test20: Check title after clicking on fourth entry', async() => {
      let headerUpdated;
      var giveHeader = await page.$eval("h1", head => head.textContent);
  
      if(giveHeader == "Entry 4") { headerUpdated = true; }
      expect(headerUpdated).toBe(true);
    });
  
});
