// cardinsider
class CreditCard {
  constructor() {
    this.rewardRate = 0;
    this.rewardRedemptionRate = 0;
    this.cardDetails = this.#getContent();
  }

  // runner function to extract overall data.
  #getContent() {
    return {
      openerSection: this.#getOpenerSection(),
      imageLink: this.#getImageLink(),
      cardTitle: this.#getTitle(),
      // 'bestSuitedFor', 'joiningFee', 'rewardType'
      ...(this.#getHeadersInfo()),
      ...(this.#getHighlightsOfCard()),
      // rewards and benefits
      rewardsBenefits: this.#getDetailedSection("div:nth-child(1) .col-lg-6"),
      // fees and charges
      keepAnEyeOn: this.#getDetailedSection("div:nth-child(2) .col-lg-4"),

    }
  }

  // function to convert a string to #camelize
  #camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  // function to check if card content has Reward Rate
  #checkRewardRate(textContent) {
    if (textContent.toLowerCase().indexOf('1 reward point') > -1 && !this.rewardRate) {
      this.rewardRate = prompt(`Reward Rate for this card is ? ${textContent}`);
    }
  }

  // function to check if card content has Reward Redemption Rate
  #checkRewardRedemptionRate(textContent) {
    if (textContent.toLowerCase().indexOf('redemption') > -1 && !this.rewardRedemptionRate) {
      this.rewardRedemptionRate = prompt(`Redemption Rate for this card is ? ${textContent}`);
    }
  }

  // function to calculate rewardPoint
  calculateRewardPoint(amount){
    return amount/this.rewardRate
  }

  // function to calculate total reward after redemption
  calculateRewardRedemptionPoint(points){
    return points/this.rewardRedemptionRate
  }

  // function to fetch data for opener Section
  #getOpenerSection() {
    let result = [];
    const openerSections = document.querySelectorAll("#main > section > div > div > div.col-md-12.top_border > p")
    for (const openerSection of openerSections) {
      const textContent = openerSection.textContent;
      this.#checkRewardRate(textContent);
      this.#checkRewardRedemptionRate(textContent);
      result.push(textContent)
    }
    return result
  }

  // function to fetch card image
  #getImageLink() {
    return document.querySelector("#main > div:nth-child(2) > div > div:nth-child(1) > div.col-md-3 > img").getAttribute('src')
  }

  // function to fetch title for card
  #getTitle() {
    return document.querySelector("#main > div:nth-child(2) > div > div:nth-child(1) > div.col-md-9 > div > div.col-md-8 > h2").innerText
  }

  // function to calculate fee with GST
  #getGstTotalFee(amount) {
    if (parseInt(amount)) {
      const tax = amount *.18;
      return amount + tax;
    }
    else {
      return 'error';
    }

  }

  // function to fetch card prominent details
  // bestSuitedFor', 'joiningFee', 'rewardType'
  #getHeadersInfo() {
    const headerTitles = document.querySelectorAll("#main > div:nth-child(2) > div > div:nth-child(1) > div.col-md-9 > div .col-lg-4");
    const prop = {}
    for (const header of headerTitles) {
      prop[this.#camelize(header.querySelector('h4').innerText)] = header.querySelector('p').innerText
    }
    return prop
  }

  // best features of card
  #getHighlightsOfCard() {
    const liS = document.querySelectorAll("#main > div:nth-child(2) > div > div:nth-child(2) > div.col-md-12.text-editer-text.dtl_two-part > ul > li")
    const andThereIsMore = []
    const gifts = {
      welcomeGifts:[],
      milestoneGifts:[],
      rewardsPoints:[]
    };
    for (const li of liS) {
      const textContent = li.textContent;
      if (textContent.toLowerCase().indexOf('welcome') > -1) {
        gifts.welcomeGifts.push(textContent);
      }
      if (textContent.toLowerCase().indexOf('reward point') > -1) {
        gifts.rewardsPoints.push(textContent)
      }
      if (textContent.toLowerCase().indexOf('milestone') > -1) {
        gifts.milestoneGifts.push(textContent);
      }
      this.#checkRewardRate(textContent);
      this.#checkRewardRedemptionRate(textContent);
      andThereIsMore.push(textContent)
    }
    return { andThereIsMore, gifts };
  }

  //function to get details of section with section path
  #getDetailedSection(sectionPath) {
    const detailsObj = {};
    const rewardsAndBenefits = document.querySelectorAll(`#main > div:nth-child(3) > div:nth-child(1) > div > ${sectionPath}`)
    for (const details of rewardsAndBenefits) {
      const rbTitle = details.querySelector('h4').textContent;
      const rbList = [];
      for (const para of details.querySelectorAll('p')) {
        para && para.textContent && rbList.push(para.textContent)
      }
      detailsObj[rbTitle] = rbList
    }
    return detailsObj;
  }
}

// let card = new CreditCard()
// console.log(card.cardDetails)
// copy(card.cardDetails)
