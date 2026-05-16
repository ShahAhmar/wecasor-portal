<?php

namespace App\Filament\Resources\ConferenceRegistrations\Pages;

use App\Filament\Resources\ConferenceRegistrations\ConferenceRegistrationResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditConferenceRegistration extends EditRecord
{
    protected static string $resource = ConferenceRegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
