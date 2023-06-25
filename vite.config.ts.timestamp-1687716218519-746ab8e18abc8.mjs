// vite.config.ts
import vue from "file:///E:/DevProjs/web-projs/cnblogs-theme-bleu/node_modules/.pnpm/@vitejs+plugin-vue@4.1.0_vite@4.3.2_vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///E:/DevProjs/web-projs/cnblogs-theme-bleu/node_modules/.pnpm/vite@4.3.2_sass@1.63.3/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///E:/DevProjs/web-projs/cnblogs-theme-bleu/node_modules/.pnpm/unplugin-auto-import@0.16.4_@vueuse+core@10.1.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/DevProjs/web-projs/cnblogs-theme-bleu/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import Icons from "file:///E:/DevProjs/web-projs/cnblogs-theme-bleu/node_modules/.pnpm/unplugin-icons@0.16.3/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///E:/DevProjs/web-projs/cnblogs-theme-bleu/node_modules/.pnpm/unplugin-icons@0.16.3/node_modules/unplugin-icons/dist/resolver.mjs";
import { ElementPlusResolver } from "file:///E:/DevProjs/web-projs/cnblogs-theme-bleu/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import UnoCSS from "file:///E:/DevProjs/web-projs/cnblogs-theme-bleu/node_modules/.pnpm/unocss@0.53.1_postcss@8.4.23_vite@4.3.2/node_modules/unocss/dist/vite.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  const { VITE_BLOG_APP } = loadEnv(mode, "./");
  return {
    plugins: [
      vue(),
      UnoCSS({
        configFile: "./uno.config.ts"
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/
          // .vue
        ],
        imports: [
          "vue",
          "pinia",
          "vue-router",
          "@vueuse/core",
          {
            "@/constants/index": [
              "RouterName",
              "RouterPath",
              "RouterRegx",
              "ProvideKey",
              "BleuVars"
            ]
          },
          {
            "@/utils/index": [
              "Broswer",
              "Formatter",
              "Native",
              "Navigation",
              "PrettifyLog",
              "Random",
              "BleuStorage",
              "Textual"
            ]
          },
          {
            from: "vue-router",
            imports: ["Router"],
            type: true
          },
          {
            from: "vue",
            imports: ["PropType"],
            type: true
          },
          {
            from: "@vueuse/core",
            imports: ["RemovableRef"],
            type: true
          }
        ],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon"
          })
        ],
        vueTemplate: true,
        dts: "./auto-imports.d.ts"
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ["ep"]
          })
        ],
        dirs: ["./src/views/**", "./src/components/**", "./src/fragments/**"]
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/scss/mixins.scss" as *; @use "sass:math";`
        }
      }
    },
    server: {
      proxy: {
        "/api": {
          target: `https://www.cnblogs.com/${VITE_BLOG_APP}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks() {
            return "components";
          },
          entryFileNames: "[name]-bleu.js",
          chunkFileNames: "[name]-bleu.js",
          assetFileNames: "[name]-bleu.[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxEZXZQcm9qc1xcXFx3ZWItcHJvanNcXFxcY25ibG9ncy10aGVtZS1ibGV1XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxEZXZQcm9qc1xcXFx3ZWItcHJvanNcXFxcY25ibG9ncy10aGVtZS1ibGV1XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9EZXZQcm9qcy93ZWItcHJvanMvY25ibG9ncy10aGVtZS1ibGV1L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XHJcbmltcG9ydCBJY29ucyBmcm9tIFwidW5wbHVnaW4taWNvbnMvdml0ZVwiO1xyXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tIFwidW5wbHVnaW4taWNvbnMvcmVzb2x2ZXJcIjtcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcclxuaW1wb3J0IFVub0NTUyBmcm9tIFwidW5vY3NzL3ZpdGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCB7IFZJVEVfQkxPR19BUFAgfSA9IGxvYWRFbnYobW9kZSwgXCIuL1wiKTtcclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgVW5vQ1NTKHtcclxuICAgICAgICBjb25maWdGaWxlOiBcIi4vdW5vLmNvbmZpZy50c1wiXHJcbiAgICAgIH0pLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAvXFwuW3RqXXN4PyQvLCAvLyAudHMsIC50c3gsIC5qcywgLmpzeFxyXG4gICAgICAgICAgL1xcLnZ1ZSQvLFxyXG4gICAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8gLy8gLnZ1ZVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgXCJ2dWVcIixcclxuICAgICAgICAgIFwicGluaWFcIixcclxuICAgICAgICAgIFwidnVlLXJvdXRlclwiLFxyXG4gICAgICAgICAgXCJAdnVldXNlL2NvcmVcIixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJAL2NvbnN0YW50cy9pbmRleFwiOiBbXHJcbiAgICAgICAgICAgICAgXCJSb3V0ZXJOYW1lXCIsXHJcbiAgICAgICAgICAgICAgXCJSb3V0ZXJQYXRoXCIsXHJcbiAgICAgICAgICAgICAgXCJSb3V0ZXJSZWd4XCIsXHJcbiAgICAgICAgICAgICAgXCJQcm92aWRlS2V5XCIsXHJcbiAgICAgICAgICAgICAgXCJCbGV1VmFyc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiQC91dGlscy9pbmRleFwiOiBbXHJcbiAgICAgICAgICAgICAgXCJCcm9zd2VyXCIsXHJcbiAgICAgICAgICAgICAgXCJGb3JtYXR0ZXJcIixcclxuICAgICAgICAgICAgICBcIk5hdGl2ZVwiLFxyXG4gICAgICAgICAgICAgIFwiTmF2aWdhdGlvblwiLFxyXG4gICAgICAgICAgICAgIFwiUHJldHRpZnlMb2dcIixcclxuICAgICAgICAgICAgICBcIlJhbmRvbVwiLFxyXG4gICAgICAgICAgICAgIFwiQmxldVN0b3JhZ2VcIixcclxuICAgICAgICAgICAgICBcIlRleHR1YWxcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBmcm9tOiBcInZ1ZS1yb3V0ZXJcIixcclxuICAgICAgICAgICAgaW1wb3J0czogW1wiUm91dGVyXCJdLFxyXG4gICAgICAgICAgICB0eXBlOiB0cnVlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBmcm9tOiBcInZ1ZVwiLFxyXG4gICAgICAgICAgICBpbXBvcnRzOiBbXCJQcm9wVHlwZVwiXSxcclxuICAgICAgICAgICAgdHlwZTogdHJ1ZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZnJvbTogXCJAdnVldXNlL2NvcmVcIixcclxuICAgICAgICAgICAgaW1wb3J0czogW1wiUmVtb3ZhYmxlUmVmXCJdLFxyXG4gICAgICAgICAgICB0eXBlOiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcclxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICBwcmVmaXg6IFwiSWNvblwiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXHJcbiAgICAgICAgZHRzOiBcIi4vYXV0by1pbXBvcnRzLmQudHNcIlxyXG4gICAgICB9KSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXHJcbiAgICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbXCJlcFwiXVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICBdLFxyXG4gICAgICAgIGRpcnM6IFtcIi4vc3JjL3ZpZXdzLyoqXCIsIFwiLi9zcmMvY29tcG9uZW50cy8qKlwiLCBcIi4vc3JjL2ZyYWdtZW50cy8qKlwiXVxyXG4gICAgICB9KSxcclxuICAgICAgSWNvbnMoe1xyXG4gICAgICAgIGF1dG9JbnN0YWxsOiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBcIi9zcmNcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL3Njc3MvbWl4aW5zLnNjc3NcIiBhcyAqOyBAdXNlIFwic2FzczptYXRoXCI7YFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IGBodHRwczovL3d3dy5jbmJsb2dzLmNvbS8ke1ZJVEVfQkxPR19BUFB9YCxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoOiBhbnkpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgbWFudWFsQ2h1bmtzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJjb21wb25lbnRzXCI7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiW25hbWVdLWJsZXUuanNcIixcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcIltuYW1lXS1ibGV1LmpzXCIsXHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJbbmFtZV0tYmxldS5bZXh0XVwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1QsT0FBTyxTQUFTO0FBQ2xVLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLFlBQVk7QUFFbkIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxFQUFFLGNBQWMsSUFBSSxRQUFRLE1BQU0sSUFBSTtBQUM1QyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsUUFDTCxZQUFZO0FBQUEsTUFDZCxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUDtBQUFBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFlBQ0UscUJBQXFCO0FBQUEsY0FDbkI7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxpQkFBaUI7QUFBQSxjQUNmO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sU0FBUyxDQUFDLFFBQVE7QUFBQSxZQUNsQixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFNBQVMsQ0FBQyxVQUFVO0FBQUEsWUFDcEIsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixTQUFTLENBQUMsY0FBYztBQUFBLFlBQ3hCLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLFVBQ1Qsb0JBQW9CO0FBQUEsVUFDcEIsY0FBYztBQUFBLFlBQ1osUUFBUTtBQUFBLFVBQ1YsQ0FBQztBQUFBLFFBQ0g7QUFBQSxRQUNBLGFBQWE7QUFBQSxRQUNiLEtBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFdBQVc7QUFBQSxVQUNULG9CQUFvQjtBQUFBLFVBQ3BCLGNBQWM7QUFBQSxZQUNaLG9CQUFvQixDQUFDLElBQUk7QUFBQSxVQUMzQixDQUFDO0FBQUEsUUFDSDtBQUFBLFFBQ0EsTUFBTSxDQUFDLGtCQUFrQix1QkFBdUIsb0JBQW9CO0FBQUEsTUFDdEUsQ0FBQztBQUFBLE1BQ0QsTUFBTTtBQUFBLFFBQ0osYUFBYTtBQUFBLE1BQ2YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUs7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUSwyQkFBMkI7QUFBQSxVQUNuQyxjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUMsU0FBYyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDbkQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sZUFBZTtBQUNiLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0EsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
