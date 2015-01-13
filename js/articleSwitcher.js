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
 * articleSwitcher = {}
 * - articleIndex = [Article, Article, ...]
 * - config = {}
 *   - article = {}
 *     - class
 *     - openClass
 *     - focusClass
 *     - offsetTop
 *     - titleClass
 *   - focus
 *     - class
 *     - animationTime
 *   - container
 *     - tolarance
 *
 * Article = {}
 * - _node = DOMNode
 * - state = {focus: bool, open: bool}
 * - size = (height: integer, width: integer)
 * - getTitlePosition() returns (x: integer, y: integer)
 * - close()
 * - open()
 * - focus()
 * - unFocus()
 * - updatePos()
 * - getHeight()
 * - appendChild()
 *
 * Focus = {}
 *   This should be the line which jumps from title to title
 * Should have
 * - flyingThingi = DOMNode
 * - _position = integer
 * - goto() uses scrollTo, sets position
 *
 * Control
 *   When articleSwitcher is initialized Control will create all Articles and create the index for Focus
 * Should have:
 * - _container
 * - switchPos = integer the position in pixels where the focus should switch
 * - current
 * - init()
 *   - _createIndex
 *   - _setScrollListener()
 *     - _updateSwitchPos()
 *
 * getOffset(node)
 */

articleSwitcher = {
  articleIndex: [],
  config: {
    article: {
      class: 'article',
      openClass: 'article--open',
      focusClass: 'article--focus',
      offsetTop: '20',
      titleClass: 'article__title',
    },
    focus: {
      class: 'focusLine',
      animationTime: 200,
      triggerTime: 500,
    },
    container: {
      class: 'main',
      correction: 60,
    }
  }
};

articleSwitcher.createArticle = (function (node) {
  var _node = node,
  _state = {
    focus: false,
    open: false
  },
  _titlePosition = getOffset(_node);
  _size = {
    height: _node.height,
    width: _node.width
  };

  return {
    open: function () {
      if(!_state.open) {
        _node.className += ' ' + articleSwitcher.config.article.openClass;
        _node.style.height = (60 + _node.children[1].clientHeight) + 'px';
        _state.open = true;
      }
    },

    close: function () {
      if(_state.open) {
        _node.className = _node.className.replace(' ' + articleSwitcher.config.article.openClass, '');
        _node.style.height = '60px'
        _state.open = false;
      }
    },

    focus: function () {
      _node.className += ' ' + articleSwitcher.config.article.focusClass;
    },

    unFocus: function () {
      _node.className = _node.className.replace('' + articleSwitcher.config.article.focusClass, '');
    },

    getHeight: function () {
      return _size.height;
    },

    appendElement: function (element) {
      _node.appendChild(element);
    },

    getTitlePosition: function () {
      return _titlePosition;
    },

    updatePos: function () {
     _titlePosition = getOffset(_node);
    },
  }
});

articleSwitcher.createFocus = (function () {
  var _position = 0,
  _flyingThingi = document.createElement('div');

  _flyingThingi.className = articleSwitcher.config.focus.class;
  document.body.appendChild(_flyingThingi);
  return {
    goto: function (index) {
      _flyingThingi.remove();
      articleSwitcher.articleIndex[index].appendElement(_flyingThingi);
      var moveBy = articleSwitcher.articleIndex[_position].getHeight() + articleSwitcher.config.article.offsetTop;
      _flyingThingi.style.transform = 'translateY: '+ moveBy + 'px';
      setTimeout(function () {
        _flyingThingi.remove();
        articleSwitcher.articleIndex[index].appendElement(_flyingThingi);
      }, articleSwitcher.config.focus.animationTime);
    }
  }
});

// ToDo
articleSwitcher.createControl = (function () {
  var _container = document.querySelector(articleSwitcher.config.container.class),
  current = 0,
  _switchPos = 0,
  _blocked = true,
  _blockCheck = false;

  function _createIndex () {
    var allArticleNodes = document.querySelectorAll(articleSwitcher.config.config.article.class);
    for(var key in allArticleNodes) {
      if(allArticleNodes.hasOwnProperty(key)) {
        var thisNode = allArticleNodes[key];
        articleSwitcher.articleIndex.push(createArticle(thisNode));
      }
    }
    _updateSwitchPos();
  }

  function _setScrollListener () {
    window.addEventListener('scroll', function () {
      if(!_blockCheck && _blocked) {
        _blocked = false;
      }
    });
    setInterval(function () {
      if(!_blocked) {
        _checkScrollPos();
      }
    }, 200);
    window.addEventListener('resize', function () {
      _updateSwitchPos();
    });
  }

  function _checkScrollPos () {
    _shouldSwitch('next', function () {
      setTimeout(function () {
        _shouldSwitch('next', function () {
          _blockCheck = true;
          articleSwitcher.articleIndex[current + 1].open();
          articleSwitcher.focus.goto(current + 1);
          articleSwitcher.articleIndex[current].close();
          current = current + 1;
          _updateSwitchPos();
          setTimeout(function () {
            _blockCheck = false;
          }, (articleSwitcher.config.focus.animationTime * 2));
        });
      },articleSwitcher.config.focus.triggerTime);
    });
    _shouldSwitch('prev', function () {
      setTimeout(function () {
        _shouldSwitch('prev', function () {
          _blockCheck = true;
          articleSwitcher.articleIndex[current - 1].open();
          articleSwitcher.focus.goto(current - 1);
          articleSwitcher.articleIndex[current].close();
          current = current - 1;
          _updateSwitchPos();
          articleSwitcher.articleIndex[current].updatePos();
          setTimeout(function () {
            _blockCheck = false;
          }, (articleSwitcher.config.focus.animationTime * 2));
        });
      },articleSwitcher.config.focus.triggerTime);
    });
  }

  function _shouldSwitch (condition, callback) {
    setTimeout(function () {
      if(condition === 'prev' && current !== 0 && window.pageYOffset < articleSwitcher.articleIndex[current - 1].getTitlePosition().y) {
        _blocked = true;
        callback();
        _updateSwitchPos();
      } else if (condition === 'next' && current !== articleSwitcher.articleIndex.length - 1 && window.pageYOffset >= (_switchPos + articleSwitcher.config.container.correction)) {
        _blocked = true;
        callback();
        _updateSwitchPos();
      }
    }, 1);
  }

  function _checkIfAnyShouldOpen (index) {
    var index = index || 0;
    articleSwitcher.articleIndex[index].updatePos();
    if(innerHeight >= articleSwitcher.articleIndex[index].getTitlePosition().y) {
      articleSwitcher.articleIndex[index].open();
      setTimeout(function () {
        _checkIfAnyShouldOpen(index + 1);
      }, articleSwitcher.config.focus.animationTime);
    }
  }

  function _updateSwitchPos () {
    if(articleSwitcher.articleIndex[current + 1]) {
      setTimeout(function () {
        articleSwitcher.articleIndex[current + 1].updatePos();
        _switchPos = articleSwitcher.articleIndex[current + 1].getTitlePosition().y - innerHeight;
      },1);
    } else {
      _switchPos = 0;
    }
  }

  function _createIndex (callback) {
    setTimeout( function () {
      var allArticles = document.querySelectorAll('.' + articleSwitcher.config.article.class);
      for(prop in allArticles) {
        if(allArticles.hasOwnProperty(prop)) {
          articleSwitcher.articleIndex.push(articleSwitcher.createArticle(allArticles[prop]));
        }
      }
      callback();
    }, 1);
  }

  return {
    init: function () {
      _createIndex(function () {
        _setScrollListener ();
        _updateSwitchPos();
        _checkIfAnyShouldOpen();
      });
    }
  }
});

// Initializing everything
document.addEventListener('readystatechange', function () {
  if(document.readyState == 'interactive') {
    articleSwitcher.control = articleSwitcher.createControl();
    articleSwitcher.focus = articleSwitcher.createFocus();
    articleSwitcher.control.init();
  }
});

function getOffset (thisNode) {
  var pos = {
    x: thisNode.offsetLeft,
    y: thisNode.offsetTop
  },
  child = thisNode;
  while(child = child.offsetParent) {
    pos.x += child.offsetLeft;
    pos.y += child.offsetTop;
  }
  return pos;
};