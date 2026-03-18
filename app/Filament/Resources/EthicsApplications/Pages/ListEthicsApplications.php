<?php

namespace App\Filament\Resources\EthicsApplications\Pages;

use App\Filament\Resources\EthicsApplications\EthicsApplicationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListEthicsApplications extends ListRecords
{
    protected static string $resource = EthicsApplicationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
