export namespace MenuTransform {
  /**
   * 解析侧边栏博客排行信息。
   */
  export function parseMenuRankList(dom: Document): BleuMenuItemData[] {
    const data: BleuMenuItemData[] = [];
    const eles = dom.querySelectorAll("li");

    for (let i = 0; i < eles.length; i++) {
      const t = eles[i].innerText.trim();
      const text = t.match(/^[\u4e00-\u9fa5]*/g)[0];
      const digg = t.match(/\d+/g)[0];
      data.push({ text, digg });
    }

    return data;
  }

  function loadColumn(
    dom: Document,
    selector: string,
    success: (e: Element, matched?: any) => void,
    regexp?: RegExp
  ) {
    dom.querySelectorAll(selector).forEach(ele => {
      if (regexp) {
        const matched = ele.getAttribute("href")?.match(regexp);
        if (matched) success(ele, matched);
      } else success(ele);
    });
  }

  /**
   * 解析侧边栏分类列表、标签列表，... 列表
   */
  export function toMenuColumn(dom: Document): BleuMenuColumn {
    const data: BleuMenuColumn = {
      essaySort: [],
      essayArchive: [],
      articleArchive: [],
      articleSort: [],
      latestEssayList: [],
      latestComments: [],
      rankings: [],
      tagList: [],
      albumn: []
    };

    loadColumn(
      dom,
      "#sidebar_recentposts ul li > a",
      (e, matched) => {
        data.latestEssayList.push({
          id: matched[0],
          text: e.innerText
        });
      },
      /[0-9]+/g
    );

    loadColumn(
      dom,
      "#sidebar_toptags ul li > a",
      (e, matched) => {
        data.tagList.push({
          id: matched[1],
          text: e.innerText
        });
      },
      /tag\/(.[^\/]+)/
    );

    loadColumn(dom, "#sidebar_scorerank ul li", e => {
      data.rankings.push({
        text: e.innerText
      });
    });

    loadColumn(
      dom,
      "#sidebar_postcategory ul li > a",
      (e, matched) => {
        data.essaySort.push({
          id: matched[0],
          text: e.innerText
        });
      },
      /[0-9]+/g
    );

    loadColumn(
      dom,
      "#sidebar_postarchive ul li > a",
      (e, matched) => {
        const date = matched[1].split("/");
        data.essayArchive.push({
          id: `${date[0]}-${date[1]}`,
          text: e.innerText
        });
      },
      /archive\/([0-9]+\/[0-9]+)/
    );

    loadColumn(
      dom,
      "#sidebar_imagecategory ul li > a",
      (e, matched) => {
        data.albumn.push({
          id: matched[1],
          text: e.innerText
        });
      },
      /gallery\/([0-9]+)/
    );

    loadColumn(
      dom,
      "#sidebar_articlecategory ul li > a",
      (e, matched) => {
        data.articleSort.push({
          id: matched[0],
          text: e.innerText
        });
      },
      /[0-9]+/g
    );

    loadColumn(
      dom,
      "#sidebar_articlearchive ul li > a",
      (e, matched) => {
        const date = matched[1].split("/");
        data.articleArchive.push({
          id: `${date[0]}-${date[1]}`,
          text: e.innerText
        });
      },
      /archives\/([0-9]+\/[0-9]+)/
    );

    let count = 1;
    let bounds = false;
    let comment = { id: "", title: "", content: "", author: "" };

    const elesLi = dom.querySelectorAll("#sidebar_recentcomments ul li");

    for (let i = 0; i < elesLi.length; i++) {
      if (bounds) bounds = false;

      if (!bounds) {
        const attr = elesLi[i].getAttribute("class");
        if (attr === "recent_comment_title") {
          const eleA = elesLi[i].getElementsByTagName("a")[0];
          comment.title = eleA.innerText;
          comment.id = eleA.getAttribute("href").match(/[0-9]+/g)[0];
        } else if (attr === "recent_comment_body") {
          comment.content = elesLi[i].innerText;
        } else if (attr === "recent_comment_author") {
          comment.author = Textual.replace(elesLi[i].innerText, [/--/g]);
        }
      }

      if (count % 3 == 0) {
        bounds = true;
        data.latestComments.push(comment);
        comment = { id: "", title: "", content: "", author: "" };
      }
      count++;
    }

    return data;
  }

  /**
   * 解析侧边栏博主主人基本的昵称、粉丝数、园龄等数据
   */
  export function toAuthorData(dom: Document): BleuMenuItemData[] {
    const nodeList = dom.querySelectorAll("#profile_block > a");
    return Array.from(nodeList).map(ele => ({
      text: ele.innerText.trim(),
      href: ele.getAttribute("href")
    }));
  }

  /**
   * 解析博主主人的随笔、文章、评论、阅读等数据
   */
  export function toMasterData(dom: Document): BleuMenuItemData[] {
    const data: BleuMenuItemData[] = [];
    const eles = dom.getElementsByTagName("span");

    for (let index = 0; index < eles.length; index++) {
      if (eles[index].getAttribute("id")) {
        const t = eles[index].innerText;
        const text = t.match(/^[\u4e00-\u9fa5]*/g)[0];
        let digg = t.match(/\d+/g)[0];
        if (index === 3) digg = Formatter.unit(digg);
        data.push({ text, digg });
      }
    }

    return data;
  }

  /**
   * 解析博客阅读排行榜
   */
  export function toTopList(dom: Document): BleuTopList {
    const data: BleuTopList = {
      topView: [],
      topComments: [],
      topDigg: []
    };

    const elesTopComms = dom.querySelectorAll("#TopFeedbackPostsBlock ul > li > a");

    for (let index = 0; index < elesTopComms.length; index++) {
      data.topComments.push({
        id: elesTopComms[index]
          .getAttribute("href")
          ?.match(/\/p\/\d+/g)[0]
          .split("/")[2],
        text: elesTopComms[index].innerText
      });
    }

    const elesTopWors = dom.querySelectorAll("#TopViewPostsBlock ul > li > a");

    for (let index = 0; index < elesTopWors.length; index++) {
      data.topView.push({
        id: elesTopWors[index]
          .getAttribute("href")
          ?.match(/\/p\/\d+/g)[0]
          .split("/")[2],
        text: elesTopWors[index].innerText
      });
    }

    data.topDigg = Array.from(dom.querySelectorAll("#TopViewPostsBlock ul > li > a")).map(ele => ({
      id: ele
        .getAttribute("href")
        ?.match(/\/p\/\d+/g)[0]
        .split("/")[2],
      text: ele.innerText
    }));

    return data;
  }
}
