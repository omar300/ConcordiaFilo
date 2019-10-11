import { TabsPage } from './tabs.page';
import { RouterModule, Route, Routes } from '@angular/router';
import { ngModuleJitUrl } from '@angular/compiler';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'feed', loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule) },
            { path: 'uploader', loadChildren: () => import('../uploader/uploader.module').then(m => m.UploaderPageModule) },
            { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule) },
            { path: 'pdftester', loadChildren: () => import('../pdftester/pdftester.module').then(m => m.PdftesterPageModule) },
            { path: 'firelist', loadChildren: () => import('../firelist/firelist.module').then(m => m.FirelistPageModule) }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule { }
