/*
 * articleSwitcher.js
 *
 * This This toggles articles
 *
 * It should:
 * - Close an article if it's title isn't visible
 * - Hide all closed articles of canvas
 * - Show the title of the next article
 * - open the next article when the user scrolls to the bottom of the page or clicks it's title
 * - Put an animated line next to the article that is in focus
 *
 * ArticleSwitcher = {}
 * - config = {}
 *   - article = {}
 *     - openClass = {}
 *     - focusClass
 *
 * Article = {}
 * - _node = DOMNode
 * - state = {focus: bool, open: bool}
 * - titlePosition = (x: integer, y: integer)
 * - size = (height: integer, width: integer)
 * - close()
 * - open()
 * - focus()
 * - unFocus()
 *
 * Focus = {}
 *   This should be the line which jumps from title to title
 * Should have
 * - articleIndex = [Article, Article, ...]
 * - position = integer
 * - goto() uses scrollTo, sets position
 *
 * Controll
 *   When articleSwitcher is initialized Controll will create all Article's and create the index for Focus
 * Should have:
 * - switchPos = integer the position in pixels where the focus should switch
 * - setScrollListener()
 *   - updateSwitchPos()
 */

articleSwitcher = {
  config: {
    article: {
      openClass: 'article--open';
      focusClass: 'article--focus';
    }
  }
};

articleSwitcher.createArticle = (function (node) {
  var _node = node,
  state = {
    focus: false,
    open: false
  },
  titlePosition,
  size = {
    height: _node.height,
    width: _node.width
  };
  return {
    open: function () {
      _node.className += ' ' + this.config.openClass;
    },

    close: function () {
      _node.className = _node.className.replace('' + this.config.openClass, '');
    },

    focus: function () {
      _node.className += ' ' + this.config.focusClass;
    },

    unFocus: function () {
      _node.className = _node.className.replace('' + this.config.focusClass, '');
    },
  }
});