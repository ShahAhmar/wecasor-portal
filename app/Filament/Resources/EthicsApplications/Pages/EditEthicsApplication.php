<?php

namespace App\Filament\Resources\EthicsApplications\Pages;

use App\Filament\Resources\EthicsApplications\EthicsApplicationResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditEthicsApplication extends EditRecord
{
    protected static string $resource = EthicsApplicationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
