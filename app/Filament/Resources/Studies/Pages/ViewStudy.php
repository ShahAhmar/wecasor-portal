<?php

namespace App\Filament\Resources\Studies\Pages;

use App\Filament\Resources\Studies\StudyResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewStudy extends ViewRecord
{
    protected static string $resource = StudyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
