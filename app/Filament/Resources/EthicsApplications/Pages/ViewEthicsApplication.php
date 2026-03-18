<?php

namespace App\Filament\Resources\EthicsApplications\Pages;

use App\Filament\Resources\EthicsApplications\EthicsApplicationResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewEthicsApplication extends ViewRecord
{
    protected static string $resource = EthicsApplicationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
