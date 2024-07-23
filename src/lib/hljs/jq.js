/*
Language: jq
Author: Steffan153
Website: https://jqlang.github.io/jq/
Description: language definition for jq scripts
Category: scripting
*/

/** @type LanguageFn */
export default function (hljs) {
  return {
    name: "jq",
    keywords: {
      keyword:
        'import include module def as break label reduce foreach if then elif else end and or not try catch',
      literal:
        'true false null',
      built_in:
        'input_line_number input_filename now localtime gmtime mktime strflocaltime strftime strptime stderr debug modulemeta get_jq_origin get_prog_origin get_search_list halt_error halt env format error max min sort nan infinite isnormal isnan isinfinite type utf8bytelength length contains has delpaths getpath setpath implode explode split rtrimstr ltrimstr endswith startswith keys_unsorted keys tostring tonumber fromjson tojson lgamma_r modf frexp ldexp trunc scalbln scalb round rint nexttoward nextafter nearbyint logb log1p lgamma fmod fmin fmax fma fdim fabs expm1 erfc erf copysign ceil yn jn y1 y0 tgamma tanh tan sqrt sinh sin remainder pow log2 log10 log j1 j0 hypot floor exp2 exp cosh cos cbrt atanh atan2 atan asinh asin acosh acos empty not path range halt_error error map select sort_by group_by unique unique_by max_by min_by add del map_values recurse recurse recurse recurse_down to_entries from_entries with_entries reverse indices index rindex paths paths any any any all all all isfinite arrays objects iterables booleans numbers normals finites strings nulls values scalars scalars_or_empty leaf_paths join flatten flatten range fromdateiso8601 todateiso8601 fromdate todate match match test test capture capture scan splits splits split sub sub gsub gsub range while until limit isempty first last nth first last nth combinations combinations transpose in inside input repeat inputs ascii_downcase ascii_upcase truncate_stream fromstream tostream bsearch walk INDEX INDEX JOIN JOIN JOIN IN IN drem exp10 gamma pow10 significand builtins'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        scope: 'variable',
        begin: '\\$[a-zA-Z_]\\w*'
      },
      {
        scope: 'number',
        begin: '(-?)(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?'
      },
      {
        scope: 'string',
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
}
