"use strict";

exports.__esModule = true;
exports.useNewFeed = useNewFeed;

var _useInfinite2 = require("./use-infinite");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useNewFeed() {
  const _useInfinite = (0, _useInfinite2.useInfinite)(index => "/listing/videos/new?page=" + index),
        {
    data
  } = _useInfinite,
        props = _objectWithoutPropertiesLoose(_useInfinite, ["data"]);

  return _extends({
    content: data
  }, props);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLW5ldy1mZWVkLnRzIl0sIm5hbWVzIjpbInVzZU5ld0ZlZWQiLCJpbmRleCIsImRhdGEiLCJwcm9wcyIsImNvbnRlbnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7Ozs7OztBQUdPLFNBQVNBLFVBQVQsR0FBbUU7QUFDeEUsdUJBQTJCLCtCQUN4QkMsS0FBRCxrQ0FBdUNBLEtBRGQsQ0FBM0I7QUFBQSxRQUFNO0FBQUVDLElBQUFBO0FBQUYsR0FBTjtBQUFBLFFBQWlCQyxLQUFqQjs7QUFJQTtBQUNFQyxJQUFBQSxPQUFPLEVBQUVGO0FBRFgsS0FFS0MsS0FGTDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnJvd3NhYmxlIH0gZnJvbSBcIkBnYXRzYnktdHYvdHlwZXNcIjtcblxuaW1wb3J0IHsgdXNlSW5maW5pdGUgfSBmcm9tIFwiQGxpYi91dGlsaXRpZXMvdXNlLWluZmluaXRlXCI7XG5pbXBvcnQgeyBJbmZpbml0ZUZldGNoUmVzcG9uc2UgfSBmcm9tIFwiQGxpYi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlTmV3RmVlZCgpOiBJbmZpbml0ZUZldGNoUmVzcG9uc2U8XCJjb250ZW50XCIsIEJyb3dzYWJsZT4ge1xuICBjb25zdCB7IGRhdGEsIC4uLnByb3BzIH0gPSB1c2VJbmZpbml0ZTxCcm93c2FibGU+KFxuICAgIChpbmRleCkgPT4gYC9saXN0aW5nL3ZpZGVvcy9uZXc/cGFnZT0ke2luZGV4fWBcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGNvbnRlbnQ6IGRhdGEsXG4gICAgLi4ucHJvcHMsXG4gIH07XG59XG4iXX0=