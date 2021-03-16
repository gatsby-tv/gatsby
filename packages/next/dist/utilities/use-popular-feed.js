"use strict";

exports.__esModule = true;
exports.usePopularFeed = usePopularFeed;

var _useInfinite2 = require("./use-infinite");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function usePopularFeed() {
  const _useInfinite = (0, _useInfinite2.useInfinite)(index => "/listing/videos/popular?page=" + index),
        {
    data
  } = _useInfinite,
        props = _objectWithoutPropertiesLoose(_useInfinite, ["data"]);

  return _extends({
    content: data
  }, props);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLXBvcHVsYXItZmVlZC50cyJdLCJuYW1lcyI6WyJ1c2VQb3B1bGFyRmVlZCIsImluZGV4IiwiZGF0YSIsInByb3BzIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQTs7Ozs7O0FBR08sU0FBU0EsY0FBVCxHQUF1RTtBQUM1RSx1QkFBMkIsK0JBQ3hCQyxLQUFELHNDQUEyQ0EsS0FEbEIsQ0FBM0I7QUFBQSxRQUFNO0FBQUVDLElBQUFBO0FBQUYsR0FBTjtBQUFBLFFBQWlCQyxLQUFqQjs7QUFJQTtBQUNFQyxJQUFBQSxPQUFPLEVBQUVGO0FBRFgsS0FFS0MsS0FGTDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnJvd3NhYmxlIH0gZnJvbSBcIkBnYXRzYnktdHYvdHlwZXNcIjtcblxuaW1wb3J0IHsgdXNlSW5maW5pdGUgfSBmcm9tIFwiQGxpYi91dGlsaXRpZXMvdXNlLWluZmluaXRlXCI7XG5pbXBvcnQgeyBJbmZpbml0ZUZldGNoUmVzcG9uc2UgfSBmcm9tIFwiQGxpYi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlUG9wdWxhckZlZWQoKTogSW5maW5pdGVGZXRjaFJlc3BvbnNlPFwiY29udGVudFwiLCBCcm93c2FibGU+IHtcbiAgY29uc3QgeyBkYXRhLCAuLi5wcm9wcyB9ID0gdXNlSW5maW5pdGU8QnJvd3NhYmxlPihcbiAgICAoaW5kZXgpID0+IGAvbGlzdGluZy92aWRlb3MvcG9wdWxhcj9wYWdlPSR7aW5kZXh9YFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgY29udGVudDogZGF0YSxcbiAgICAuLi5wcm9wcyxcbiAgfTtcbn1cbiJdfQ==