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
 * Article = {}
 * Should have:
 * - state = {focus: bool, open: bool}
 * - titlePosition = (x: integer, y: integer)
 * - size = (height: integer, width: integer)
 * - close()
 * - open()
 * - focus() setts data-focus
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