<?php

namespace App\Filament\Resources\ConferenceRegistrations\Pages;

use App\Filament\Resources\ConferenceRegistrations\ConferenceRegistrationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListConferenceRegistrations extends ListRecords
{
    protected static string $resource = ConferenceRegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
