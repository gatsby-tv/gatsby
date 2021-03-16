"use strict";

exports.__esModule = true;
exports.useRecommendedFeed = useRecommendedFeed;

var _useInfinite2 = require("./use-infinite");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useRecommendedFeed(id) {
  const _useInfinite = (0, _useInfinite2.useInfinite)(index => id ? "/user/" + id + "/listing/recommended?page=" + index : "/listing/videos/popular?page=" + index),
        {
    data
  } = _useInfinite,
        props = _objectWithoutPropertiesLoose(_useInfinite, ["data"]);

  return _extends({
    content: data
  }, props);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLXJlY29tbWVuZGVkLWZlZWQudHMiXSwibmFtZXMiOlsidXNlUmVjb21tZW5kZWRGZWVkIiwiaWQiLCJpbmRleCIsImRhdGEiLCJwcm9wcyIsImNvbnRlbnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7Ozs7OztBQUdPLFNBQVNBLGtCQUFULENBQ0xDLEVBREssRUFFd0M7QUFDN0MsdUJBQTJCLCtCQUF3QkMsS0FBRCxJQUNoREQsRUFBRSxjQUNXQSxFQURYLGtDQUMwQ0MsS0FEMUMscUNBRWtDQSxLQUhYLENBQTNCO0FBQUEsUUFBTTtBQUFFQyxJQUFBQTtBQUFGLEdBQU47QUFBQSxRQUFpQkMsS0FBakI7O0FBTUE7QUFDRUMsSUFBQUEsT0FBTyxFQUFFRjtBQURYLEtBRUtDLEtBRkw7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJyb3dzYWJsZSB9IGZyb20gXCJAZ2F0c2J5LXR2L3R5cGVzXCI7XG5cbmltcG9ydCB7IHVzZUluZmluaXRlIH0gZnJvbSBcIkBsaWIvdXRpbGl0aWVzL3VzZS1pbmZpbml0ZVwiO1xuaW1wb3J0IHsgSW5maW5pdGVGZXRjaFJlc3BvbnNlIH0gZnJvbSBcIkBsaWIvdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJlY29tbWVuZGVkRmVlZChcbiAgaWQ/OiBzdHJpbmdcbik6IEluZmluaXRlRmV0Y2hSZXNwb25zZTxcImNvbnRlbnRcIiwgQnJvd3NhYmxlPiB7XG4gIGNvbnN0IHsgZGF0YSwgLi4ucHJvcHMgfSA9IHVzZUluZmluaXRlPEJyb3dzYWJsZT4oKGluZGV4KSA9PlxuICAgIGlkXG4gICAgICA/IGAvdXNlci8ke2lkfS9saXN0aW5nL3JlY29tbWVuZGVkP3BhZ2U9JHtpbmRleH1gXG4gICAgICA6IGAvbGlzdGluZy92aWRlb3MvcG9wdWxhcj9wYWdlPSR7aW5kZXh9YFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgY29udGVudDogZGF0YSxcbiAgICAuLi5wcm9wcyxcbiAgfTtcbn1cbiJdfQ==