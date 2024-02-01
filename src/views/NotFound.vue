<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>404 - not found</v-card-title>
          <v-card-text>
            <span v-if="$route.params.pathMatch.length > 1 && $route.params.pathMatch[0] == 'bblock'">
              The requested building block (<code>{{ $route.params.pathMatch[1] }}</code>) could not be found.
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
