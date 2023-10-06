<template>
  <v-container>
    <v-breadcrumbs>
      <v-breadcrumbs-item :to="{ name: 'Home' }" title="Building Blocks list"></v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>404 - not found</v-card-title>
          <v-card-text>
            {{ $route.params.pathMatch }}
            <span v-if="$route.params.pathMatch?.startsWith('bblock/')">
              The requested building block (<span>{{ $route.params.pathMatch.substr() }}</span>) could not be found.
            </span>
            <span v-else>
              The requested URL could not be found.
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>
